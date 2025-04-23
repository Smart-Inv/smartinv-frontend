import { useState } from 'react';
import { CssBaseline, Box, Grid, Paper, Typography, Select, MenuItem, Avatar, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import LogoutIcon from '@mui/icons-material/Logout';

const lineData = [
  { month: 'Jan', value: 50 },
  { month: 'Feb', value: 43 },
  { month: 'Mar', value: 36 },
  { month: 'Apr', value: 44 },
  { month: 'May', value: 55 },
];

const pieData = [
  { name: 'Category A', value: 30 },
  { name: 'Category B', value: 20 },
  { name: 'Category C', value: 12 },
  { name: 'Category D', value: 6 },
];

const barData = [
  { name: '12', value: 12 },
  { name: '15', value: 15 },
  { name: '20', value: 20 },
  { name: '18', value: 18 },
  { name: '26', value: 26 },
];

const pieColors = ['#7E3FF2', '#A269FF', '#9AA0FF', '#64B5F6'];

export default function Dashboard() {
  const [stockType, setStockType] = useState('Zapatillas');
  const [timeframe, setTimeframe] = useState('Último trimestre');

  const renderLineChart = (height = 300) => (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={lineData}>
        <XAxis dataKey="month" stroke="#444" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8DDC7C"
          strokeWidth={3}
          dot={{ r: 4, fill: '#fff', stroke: '#8DDC7C' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <>
      <CssBaseline />
      <Box sx={{ p: 2, bgcolor: '#F4FCE4', minHeight: '100vh' }}>
        {/* Header */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Grid>
            <Typography variant="h5" fontWeight="bold">SMARTINV LOGO</Typography>
          </Grid>
          <Grid>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#8DDC7C', mr: 1 }}>DU</Avatar>
              <Typography variant="body1" sx={{ mr: 2 }}>Dummy User</Typography>
              <Button variant="contained" color="error" startIcon={<LogoutIcon />}>Log Out</Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {/* Left Column with 4 charts */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>STOCK A COMPRAR</Typography>
              <Select
                value={stockType}
                onChange={(e) => setStockType(e.target.value)}
                size="small"
                sx={{ bgcolor: '#8DDC7C', color: '#fff', mr: 1 }}
              >
                <MenuItem value="Zapatillas">Zapatillas</MenuItem>
                <MenuItem value="Camisetas">Camisetas</MenuItem>
                <MenuItem value="Pantalones">Pantalones</MenuItem>
              </Select>
              <Select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                size="small"
                sx={{ bgcolor: '#8DDC7C', color: '#fff' }}
              >
                <MenuItem value="Último trimestre">Último trimestre</MenuItem>
                <MenuItem value="Últimos 6 meses">Últimos 6 meses</MenuItem>
                <MenuItem value="Último año">Último año</MenuItem>
              </Select>
            </Box>
            <Grid container spacing={2}>
              {[0, 1, 2, 3].map((idx) => (
                <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                  <Paper sx={{ p: 2 }}>{renderLineChart()}</Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Typography variant="h6" fontWeight="bold">STOCK ACTUAL</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={pieColors[i % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid size={12}>
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>TUS INGRESOS</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" stroke="#444" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8DDC7C" barSize={30} />
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
