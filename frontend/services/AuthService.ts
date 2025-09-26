const API_URL = 'http://localhost:8000/api';

export const AuthService = {
    async login(email: string, password: string) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro no login');
        }

        return response.json();
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('nome');
    }
}