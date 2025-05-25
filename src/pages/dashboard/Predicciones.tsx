import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DashBoardLayOut from '../../layouts/DashBoardLayOut';
import { useDashboard } from '../../contexts/dashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Ingresos() {
  const { dashData } = useDashboard();
  const predicciones = dashData.predicciones ?? [];
  const allSeries = dashData.series ?? {};

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Evolución de ${selectedItem} + Predicción`
      },
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  if (predicciones.length === 0) {
    return (
      <DashBoardLayOut>
        <h1 className="text-2xl font-bold">Tus Predicciones</h1>
        <p className="mx-auto text-2xl">
          Tus datos todavía no están disponibles... ¡Nuestro equipo está con ello!
        </p>
      </DashBoardLayOut>
    );
  }

  const selectedSeries = selectedItem
    ? allSeries[selectedItem]?.series ?? []
    : [];

  const pred = predicciones.find(p => p.item === selectedItem);
  const predValue = pred ? Math.floor(pred.prediction) : null;

  // woopsie
  if (!selectedItem || selectedSeries.length === 0) {
    return (
      <DashBoardLayOut>
        <h1 className="text-2xl font-bold">Tus Predicciones</h1>
        <div className="flex flex-wrap gap-2 my-4">
          {predicciones.map(p => (
            <button
              key={p.item}
              onClick={() =>
                setSelectedItem(prev =>
                  prev === p.item ? null : p.item
                )
              }
              className={`px-4 py-2 border rounded cursor-pointer ${selectedItem === p.item
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800'
                }`}
            >
              {p.item}
            </button>
          ))}
        </div>
      </DashBoardLayOut>
    );
  }

  // array with labels and months
  const realLabels = selectedSeries.map(dp => dp.period);
  const [lastY, lastM] = realLabels[realLabels.length - 1]
    .split('-')
    .map(Number);
  const nextDate = new Date(lastY, lastM - 1);
  nextDate.setMonth(nextDate.getMonth() + 1);
  const nextPeriod = `${nextDate.getFullYear()}-${String(
    nextDate.getMonth() + 1
  ).padStart(2, '0')}`;
  const labels = [...realLabels, nextPeriod];

  // data prediction
  const actualData: Array<number | null> = selectedSeries.map(dp =>
    Math.floor(dp.stock)
  );
  // add null for creating an index for the prediction
  actualData.push(null);

  // data prediction is initially null
  const predData: Array<number | null> = Array(labels.length).fill(null);
  if (predValue !== null) {
    // index of last month
    const lastRealIdx = labels.length - 2;
    predData[lastRealIdx] = selectedSeries[
      selectedSeries.length - 1
    ].stock;
    // last index = pred
    predData[labels.length - 1] = predValue;
  }

  return (
    <DashBoardLayOut>
      <h1 className="text-2xl font-bold">Tus Predicciones</h1>

      {/* Item filter */}
      <div className="flex flex-wrap gap-2 my-4">
        {predicciones.map(p => (
          <button
            key={p.item}
            onClick={() =>
              setSelectedItem(prev =>
                prev === p.item ? null : p.item
              )
            }
            className={`px-4 py-2 border rounded cursor-pointer ${selectedItem === p.item
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800'
              }`}
          >
            {p.item}
          </button>
        ))}
      </div>

      {/* Chart with prediction */}
      <Line
        data={{
          labels,
          datasets: [
            {
              label: 'Stock real',
              data: actualData,
              fill: false,
              tension: 0.3
            },
            {
              label: 'Predicción',
              data: predData,
              fill: false,
              borderColor: 'red',
              borderDash: [5, 5],
              tension: 0
            }
          ]
        }}
        options={options}
      />

    </DashBoardLayOut>
  );
}
