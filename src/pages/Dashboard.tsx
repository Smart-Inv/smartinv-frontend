import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { useNavigate } from 'react-router-dom';

import {
  CssBaseline, Box, Grid, Paper, Typography,
  Select, MenuItem, Avatar, Button
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

const apiUrl = import.meta.env.VITE_API_URL;
const pieColors = ['#7E3FF2', '#A269FF', '#9AA0FF', '#64B5F6'];

// TODO: adjust this to your real company identifier,
// or derive it from the user context/response.
const COMPANY_NAME = 'fakecorp';  

export default function Dashboard() {
  const navigate = useNavigate();

  // UI state
  const [stockType, setStockType] = useState<string>('');
  const [timeframe, setTimeframe] = useState<'Último trimestre'|'Últimos 6 meses'|'Último año'>('Último trimestre');
  const [loading, setLoading] = useState(true);

  // data from /dashboard_data/
  const [dashData, setDashData] = useState<null|{
    stock_pie: {item:string,quantity:number}[],
    revenues:  {period:string,revenue:number}[],
    items:     string[]
  }>(null);

  // full history + prediction from /predict_values/
  const [fullRecords, setFullRecords] = useState<any[]>([]);

  // final line-series for the 4 charts
  const [lineData, setLineData] = useState<{month:string,value:number}[]>([]);

  // 1) Load stock_pie, revenues, items
  useEffect(() => {
    async function loadDashboard() {
      try {
        console.log(apiUrl)
        const res = await fetchWithAuth(`${apiUrl}/dashboard_data/`);
        if (!res.ok) throw new Error('Dash fetch failed');
        const json = await res.json();
        setDashData(json);
        if (json.items.length) setStockType(json.items[0]);
      } catch {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [navigate]);

  // 2) Once we know the company, pull full history+prediction
  useEffect(() => {
    if (!dashData) return;
    async function loadHistory() {
      try {
        const recRes = await fetchWithAuth(
          `${apiUrl}/predict_values/?company_name=${encodeURIComponent(COMPANY_NAME)}`
        );
        if (!recRes.ok) throw new Error('History fetch failed');
        const recJson = await recRes.json();
        setFullRecords(recJson);
      } catch (err) {
        console.error(err);
      }
    }
    loadHistory();
  }, [dashData]);

  // 3) Build the lineData for the selected item + timeframe
  useEffect(() => {
    if (!fullRecords.length || !stockType) {
      setLineData([]);
      return;
    }
    // filter for this item
    const key = `nombre_producto_${stockType}`;
    const rows = fullRecords.filter(r => r[key] === 1);

    // build a map period→stock_final
    const map: Record<string,number> = {};
    rows.forEach(r => {
      const month = `${String(r.anio).padStart(4,'0')}-${String(r.mes).padStart(2,'0')}`;
      map[month] = r.stock_final;
    });

    // to sorted array
    let arr = Object.entries(map)
      .map(([month,value]) => ({ month, value }))
      .sort((a,b) => a.month.localeCompare(b.month));

    // slice by timeframe
    const n = timeframe === 'Último trimestre' ? 3
            : timeframe === 'Últimos 6 meses'   ? 6
            : 12;
    arr = arr.slice(-n);

    // append the predicted point (it lives in each row as r.prediction)
    // take the row with the max (anio,mes)
    const latest = rows.reduce((best,cur) => {
      if (!best) return cur;
      const a = best.anio*100 + best.mes;
      const b = cur.anio*100 + cur.mes;
      return b> a ? cur : best;
    }, null as any);
    if (latest && latest.prediction != null) {
      const nextMonth = `${String(latest.anio).padStart(4,'0')}-${String(latest.mes).padStart(2,'0')}`;
      arr.push({ month: nextMonth, value: latest.prediction });
    }

    setLineData(arr);
  }, [fullRecords, stockType, timeframe]);

  if (loading) return <Typography>Loading…</Typography>;
  if (!dashData) return <Typography>Error loading dashboard</Typography>;

  // transform for recharts
  const pieData = dashData.stock_pie.map(d=>({ name:d.item, value:d.quantity }));
  const barData = dashData.revenues.map(d=>({ name:d.period, value:d.revenue }));

  return (
    <>
      <CssBaseline/>
      <Box sx={{ p:2, bgcolor:'#F4FCE4', minHeight:'100vh' }}>
        {/* Header */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb:2 }}>
          <Grid size={12}>
            <Typography variant="h5" fontWeight="bold">SMARTINV LOGO</Typography>
          </Grid>
          <Grid size={12}>
            <Box sx={{ display:'flex', justifyContent:'flex-end', alignItems:'center' }}>
              <Avatar sx={{ bgcolor:'#8DDC7C', mr:1 }}>DU</Avatar>
              <Typography sx={{ mr:2 }}>Dummy User</Typography>
              <Button variant="contained" color="error" startIcon={<LogoutIcon/>}>
                Log Out
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid size={{ xs:12, md:8 }}>
            <Box sx={{ display:'flex', alignItems:'center', mb:1 }}>
              <Typography variant="h6" sx={{ flexGrow:1 }}>STOCK A COMPRAR</Typography>
              <Select
                value={stockType}
                onChange={e=>setStockType(e.target.value)}
                size="small"
                sx={{ bgcolor:'#8DDC7C', color:'#fff', mr:1 }}
              >
                {dashData.items.map(i=>(
                  <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
              </Select>
              <Select
                value={timeframe}
                onChange={e=>setTimeframe(e.target.value as any)}
                size="small"
                sx={{ bgcolor:'#8DDC7C', color:'#fff' }}
              >
                <MenuItem value="Último trimestre">Último trimestre</MenuItem>
                <MenuItem value="Últimos 6 meses">Últimos 6 meses</MenuItem>
                <MenuItem value="Último año">Último año</MenuItem>
              </Select>
            </Box>
            <Grid container spacing={2}>
              {[0,1,2,3].map(i=>(
                <Grid size={{ xs:12, sm:6 }} key={i}>
                  <Paper sx={{ p:2 }}>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={lineData}>
                        <XAxis dataKey="month" stroke="#444" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#8DDC7C"
                          strokeWidth={2}
                          dot={{ r:3, fill:'#fff', stroke:'#8DDC7C' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs:12, md:4 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Typography variant="h6">STOCK ACTUAL</Typography>
                <Paper sx={{ p:2, mt:1 }}>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {pieData.map((_,idx)=>(
                          <Cell key={idx} fill={pieColors[idx%pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip/>
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid size={12}>
                <Typography variant="h6" sx={{ mt:2 }}>TUS INGRESOS</Typography>
                <Paper sx={{ p:2, mt:1 }}>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" stroke="#444"/>
                      <YAxis/>
                      <Tooltip/>
                      <Bar dataKey="value" fill="#8DDC7C" barSize={30}/>
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
