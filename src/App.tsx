import { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider} from '@mui/material';
import Landing from './pages/Landing';
import LogIn from './pages/LogIn';
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';

function App() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const theme = useMemo(() => (modoOscuro ? darkTheme : lightTheme), [modoOscuro]);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
