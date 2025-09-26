const API_URL = 'http://localhost:8000/api';

export const NivelService = {
    async getNiveis(search = '', page = 1, perPage = 10, campoOrdem = '', direcaoOrdem = 0) {
        let url = `${API_URL}/niveis?search=${search}&page=${page}&per_page=${perPage}`;
        if (campoOrdem) {
            url += `&campo=${campoOrdem}&ordem=${direcaoOrdem > 0 ? 'asc' : 'desc'}`;
        }
        const response = await fetch(url, {
            method: 'GET',
        });
        return response.json();
    },
    async createNivel(nivel) {
        const response = await fetch(`${API_URL}/niveis`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nivel)
        });
        return response.json();
    },
    async updateNivel(id, nivel) {
        const response = await fetch(`${API_URL}/niveis/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nivel)
        });
        return response.json();
    },
    async deleteNivel(id) {
        const response = await fetch(`${API_URL}/niveis/${id}`, {
            method: 'DELETE'
        });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao excluir nível');
    }

        return response.json();
    }
}
