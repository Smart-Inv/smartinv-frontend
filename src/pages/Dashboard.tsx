import '../styles/App.css'
import { useNavigate } from 'react-router-dom';
import { CssBaseline, Container, Typography, Button, Stack } from '@mui/material';


function Dashboard() {
  const navigate = useNavigate();


  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h1" gutterBottom color="primary">
          Dashboard
        </Typography>
      </Container>
    </>
  )
}

export default Dashboard
