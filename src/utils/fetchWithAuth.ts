const apiUrl = import.meta.env.API_URL;

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const authInit: RequestInit = {
        ...init,
        headers: {
            ...(init?.headers || {}),
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };

    let response = await fetch(input, authInit);

    // Si el token ha expirado (401), intentamos refrescarlo
    if (response.status === 401 && refreshToken) {
        const refreshResponse = await fetch(`${apiUrl}/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken })
        });

        if (refreshResponse.ok) {
            const newTokens = await refreshResponse.json();
            localStorage.setItem('access_token', newTokens.access_token);
            localStorage.setItem('refresh_token', newTokens.refresh_token);

            // Reintentar la petición original con el nuevo token
            const retryInit: RequestInit = {
                ...authInit,
                headers: {
                    ...(authInit.headers || {}),
                    Authorization: `Bearer ${newTokens.access_token}`,
                }
            };
            response = await fetch(input, retryInit);
        } else {
            // Si falla el refresh, cerrar sesión
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login'; // o usar un navigate()
            throw new Error('Sesión expirada. Por favor, inicia sesión de nuevo.');
        }
    }

    return response;
}
