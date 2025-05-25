import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";      // npm install react-icons

import DashboardSelector from "../components/DashboardSelector";

type Props = {
  children?: ReactNode;
};

const apiUrl = import.meta.env.VITE_API_URL;

export default function DashBoardLayOut({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-screen flex-row">
      {/* Botón móvil */}
      <button
        className="p-2 m-2 text-2xl md:hidden fixed z-20 top-0 left-0"
        onClick={() => setIsOpen(o => !o)}
      >
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-10 w-64
          bg-gray-200 text-dark-blue
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-1/4
        `}
      >
        <h2 className="text-xl font-semibold m-4">
          Hola <span className="font-bold">{apiUrl}</span>
        </h2>
        <ul className="m-4 flex gap-2 flex-col">
          <Link to="/dashboard/predicciones" onClick={() => setIsOpen(false)}>
            <DashboardSelector>Predicciones</DashboardSelector>
          </Link>
          <Link to="/dashboard/ingresos" onClick={() => setIsOpen(false)}>
            <DashboardSelector>Ingresos</DashboardSelector>
          </Link>
        </ul>
      </aside>

      {/* Capa oscura tras el drawer (móvil) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-5 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Contenido principal */}
      <main className="pt-4 px-4 text-left flex-1 bg-gray-100 overflow-y-auto text-dark-blue">
        {children}
      </main>
    </div>
  );
}
