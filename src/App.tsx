import { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider} from '@mui/material';
import Landing from './pages/Landing';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';

import Predicciones from './pages/dashboard/Predicciones';
import Ingresos from './pages/dashboard/Ingresos';

function App() {
  const [modoOscuro] = useState(false);
  const theme = useMemo(() => (modoOscuro ? darkTheme : lightTheme), [modoOscuro]);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/predicciones" element={<Predicciones />} />
          <Route path="/dashboard/ingresos" element={<Ingresos />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
