import '../styles/App.css'
import { Typography, CssBaseline, Stack, TextField, Button } from "@mui/material"
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../utils/fetchWithAuth';

const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl)


function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetchWithAuth(`${apiUrl}/login/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Usuario/contraseña incorrectos');
            }

            const data = await response.json();

            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('token_type', data.token_type);

            navigate('/dashboard')
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Algo ha salido mal');
            }
        }
    }

    return (
        <>
            <CssBaseline />
            <Typography variant="h3" gutterBottom color="primary">
                Iniciar Sesión
            </Typography>
            <Stack spacing={2}>
                <TextField
                    label="Correo"
                    variant="filled"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    variant="filled"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="outlined" color="primary" onClick={handleLogin}>
                    Iniciar Sesión
                </Button>
            </Stack>

            {/* Renderiza los toasts */}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default LogIn
