import '../styles/App.css'

import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

import { fetchWithAuth } from '../utils/fetchWithAuth';
import NavBar from '../components/NavBar';
import Button from '../components/Button';

const apiUrl = import.meta.env.VITE_API_URL;

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetchWithAuth(`${apiUrl}/login/`, {
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
            <NavBar />
            <article className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 md:px-8">
                <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white p-6 rounded-md shadow-md">
                    <h3 className='text-center font-bold text-light-red text-2xl sm:text-3xl mb-4'>
                        SmartInv Portal
                    </h3>
                    <section className='flex flex-col gap-4 text-left'>
                        <div className='flex flex-col'>
                            <label htmlFor="user" className="mb-1">Usuario:</label>
                            <input
                                id='user'
                                className='rounded border border-gray-300 p-2 w-full'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                
                        <div className='flex flex-col'>
                            <label htmlFor="password" className="mb-1">Contraseña:</label>
                            <input
                                id='password'
                                type="password"
                                className='rounded border border-gray-300 p-2 w-full'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button className='mt-4 w-full' textColor='text-white' bgColor='bg-light-red' onClick={handleLogin}>
                            Iniciar Sesión
                        </Button>
                    </section>
                </div>
            </article>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default LogIn
