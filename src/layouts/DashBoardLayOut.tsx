import { ReactNode } from "react";
import { Link } from "react-router-dom";

import DashboardSelector from "../components/DashboardSelector";

type Props = {
  children?: ReactNode;
};

const apiUrl = import.meta.env.VITE_API_URL;

export default function DashBoardLayOut({ children }: Props) {
  return (
    <div className="flex min-h-screen w-screen flex-row">
      <aside className="w-1/4 bg-gray-200 text-dark-blue">
        <h2 className="text-xl font-semibold m-4">
          Hola <span className="font-bold">{apiUrl}</span>
        </h2>
        <ul className="m-4 flex gap-2 flex-col">
          <Link to="/dashboard/predicciones">
            <DashboardSelector>
              Predicciones
            </DashboardSelector>
          </Link>

          <Link to="/dashboard/ingresos">
            <DashboardSelector>
              Ingresos
            </DashboardSelector>
          </Link>

        </ul>
      </aside>
      <main className="pt-4 text-left flex-1 bg-gray-100 overflow-y-auto text-dark-blue">
        {children}
      </main>
    </div>
  );
}
