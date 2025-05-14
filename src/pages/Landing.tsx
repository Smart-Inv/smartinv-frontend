import '../styles/App.css'
import { useNavigate } from 'react-router-dom';
import { CssBaseline, Container, Typography, Button, Stack } from '@mui/material';


function Landing() {
  const navigate = useNavigate();


  return (
    <>
      <CssBaseline />
      <Container>
        <h1 className='text-7xl'>SmartInv</h1>
        <Typography variant="h4">
          Tu gestor de stock inteligente.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent={'center'} sx={{mt: 4}}>
          <Button variant="contained" disabled>
            Registrarse
          </Button>
          <Button variant="outlined" color="primary" onClick={() => {navigate('/login')}}>
            Iniciar Sesión
          </Button>
        </Stack>
      </Container>
    </>
  )
}

export default Landing
