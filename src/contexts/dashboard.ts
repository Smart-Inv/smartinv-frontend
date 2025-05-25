// src/contexts/dashboard.ts
import { createContext, useContext } from "react";

interface DataPoint {
  period: string;
  stock: number;
};

export interface StockSeries {
  series: DataPoint[];
}

export type DashData = {
  items?: string[];
  ingresos?: { period: string, revenue: number }[];
  predicciones?: {item: string, prediction: number}[];
  series?: Record<string, StockSeries>;
};

export type DashboardContextValue = {
  dashData: DashData;
  setDashData: (data: DashData) => void;
};

export const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard debe usarse dentro de DashboardProvider");
  return ctx;
}
