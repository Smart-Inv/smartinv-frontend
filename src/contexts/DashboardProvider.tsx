// src/contexts/DashboardProvider.tsx
import { ReactNode, useState } from "react";
import { DashboardContext, DashData } from "./dashboard";

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [dashData, setDashData] = useState<DashData>({});
  return (
    <DashboardContext.Provider value={{ dashData, setDashData }}>
      {children}
    </DashboardContext.Provider>
  );
}
