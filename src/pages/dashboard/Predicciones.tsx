import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DashBoardLayOut from '../../layouts/DashBoardLayOut';
import { useDashboard } from '../../contexts/dashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Ingresos() {
  const { dashData } = useDashboard();
  const predicciones = dashData.predicciones ?? [];

  // Estado para el item seleccionado (o null = ninguno)
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

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

  // Busca la predicción del item seleccionado
  const selectedPred = predicciones.find(p => p.item === selectedItem);

  return (
    <DashBoardLayOut>
      <h1 className="text-2xl font-bold">Tus Predicciones</h1>

      {/* Filtro: botones para cada item */}
      <div className="flex flex-wrap gap-2 my-4">
        {predicciones.map(pred => (
          <button
            key={pred.item}
            onClick={() =>
              setSelectedItem(prev =>
                prev === pred.item ? null : pred.item
              )
            }
            className={`px-4 py-2 border rounded cursor-pointer ${
              selectedItem === pred.item
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800'
            }`}
          >
            {pred.item}
          </button>
        ))}
      </div>

      {/* Renderiza el chart solo si hay un item seleccionado */}
      {selectedPred && (
        <Bar
          data={{
            labels: [selectedPred.item],
            datasets: [
              {
                label: 'Predicciones del objeto',
                data: [Math.floor(selectedPred.prediction)],
                backgroundColor: 'blue'
              }
            ]
          }}
          options={options}
        />
      )}
    </DashBoardLayOut>
  );
}
