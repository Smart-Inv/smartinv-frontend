const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!token) {
        // no token, redirect
        window.location.href = '/login';
        throw new Error("No token found!")
    }

    const authInit: RequestInit = {
        ...init,
        headers: {
            ...(init?.headers || {}),
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };

    let response = await fetch(input, authInit);

    // if 401, try to refresh it
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

            // retry prev petition
            const retryInit: RequestInit = {
                ...authInit,
                headers: {
                    ...(authInit.headers || {}),
                    Authorization: `Bearer ${newTokens.access_token}`,
                }
            };
            response = await fetch(input, retryInit);
        } else {
            // close session, redirect
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
            throw new Error('Sesión expirada. Por favor, inicia sesión de nuevo.');
        }
    }

    return response;
}
