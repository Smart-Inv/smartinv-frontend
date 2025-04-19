import '../styles/App.css'
import { Typography, CssBaseline, Stack, TextField, Button } from "@mui/material"
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/login', {
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
            console.log('Respuesta del servidor:', data);
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
