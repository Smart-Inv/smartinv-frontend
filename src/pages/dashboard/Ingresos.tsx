import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DashBoardLayOut from '../../layouts/DashBoardLayOut';
import { useDashboard } from '../../contexts/dashboard';

ChartJS.register(
  CategoryScale,   // eje X de categorías
  LinearScale,     // eje Y numérico
  BarElement,      // barras
  Title,
  Tooltip,
  Legend
);

export default function Ingresos() {
  const { dashData } = useDashboard();

  const ingresos = dashData.ingresos ?? [];

  const backgroundColors = ingresos.map(item =>
    item.revenue >= 0
      ? 'green'
      : 'var(--color-light-red)'
  );

  const data = {
    labels: ingresos.map(item => item.period),
    datasets: [
      {
        label: 'Ingresos (€)',
        data: ingresos.map(item => item.revenue),
        backgroundColor: backgroundColors
      }
    ]
  };

  // 3) Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tus Ingresos por Periodo'
      },
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <DashBoardLayOut>
      <h1 className="text-2xl font-bold">Tus Ingresos</h1>
      {ingresos.length === 0 ? (
        <p className='mx-auto text-2xl'>Tus datos todavía no están disponibles... ¡Nuestro equipo está con ello!</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </DashBoardLayOut>
  );
}
