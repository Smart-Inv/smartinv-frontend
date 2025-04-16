import './App.css'
import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Container, Typography, Button, Stack } from '@mui/material';
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';

function App() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const theme = useMemo(() => (modoOscuro ? darkTheme : lightTheme), [modoOscuro]);

  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <Container>
      <Typography variant="h1" gutterBottom color="primary">
        SmartInv
      </Typography>
      <Typography variant="h4">
        Tu gestor de stock inteligente.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent={'center'} sx={{mt: 4}}>
        <Button variant="contained" disabled>
          Registrarse
        </Button>
        <Button variant="outlined" color="primary">
          Iniciar Sesión
        </Button>
      </Stack>
    </Container>
  </ThemeProvider>
  )
}

export default App
