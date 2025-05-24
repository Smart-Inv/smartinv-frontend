import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { useNavigate } from 'react-router-dom';

import DashBoardLayOut from '../layouts/DashBoardLayOut';
import { useDashboard } from '../contexts/dashboard';

const apiUrl = import.meta.env.VITE_API_URL;
// const pieColors = ['#7E3FF2', '#A269FF', '#9AA0FF', '#64B5F6'];

// TODO: adjust this to your real company identifier,
// or derive it from the user context/response.
//const COMPANY_NAME = 'fakecorp';

export default function Dashboard() {
  const navigate = useNavigate();

  // UI state
  // const [stockType, setStockType] = useState<string>('');
  // const [timeframe, setTimeframe] = useState<'Último trimestre' | 'Últimos 6 meses' | 'Último año'>('Último trimestre');
  const [loading, setLoading] = useState(true);

  // load data from fetching into an object
  const { dashData, setDashData } = useDashboard()

  // full history + prediction from /predict_values/
  // TODO: define type
  //const [fullRecords, setFullRecords] = useState<any[]>([]);

  // final line-series for the 4 charts
  //const [lineData, setLineData] = useState<{ month: string, value: number }[]>([]);

  // 1) Load stock_pie, revenues, items
  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await fetchWithAuth(`${apiUrl}/dashboard_data/`);
        if (!res.ok) throw new Error('Dash fetch failed');
        const data = await res.json();
        console.log(data);
        setDashData({ingresos : data.revenues,
                    items : data.items,
                    predicciones : data.predictions}
        );
        //if (json.items.length) setStockType(json.items[0]);
      } catch {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [navigate, setDashData]);

  if (loading) return <p className='mx-auto text-xl'>Estamos cargando tus datos...</p>;

  if (!dashData) return <p className='mx-auto text-xl text-light-red'>
    Error al cargar los datos. Contacte con su administrador.
  </p>;

  return (
    <DashBoardLayOut>
      <section className='px-6 text-left'>
        <h2 className='font-bold text-3xl'>¡Bienvenido/a a SmartInv!</h2>
        <p className='mt-4 w-3/5'>En estos momentos tienes acceso a nuestra plataforma en programa piloto. Si todavía no puedes ver nada, no te preocupes, nuestro equipo está <span className='font-bold'>integrando los datos de tu negocio </span>en nuestra plataforma. El proceso suele tardar <span className='font-bold'>de una a dos semanas</span>. Nos comunicaremos contigo lo antes posible.</p>
      </section>
    </DashBoardLayOut>
  );
}
