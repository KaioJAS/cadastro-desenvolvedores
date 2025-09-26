const API_URL = 'http://localhost:8000/api';

export const DesenvolvedorService = {
    async getDesenvolvedores(search = '', page = 1, perPage = 10, campoOrdem = '', direcaoOrdem = 0) {
        let url = `${API_URL}/desenvolvedor?search=${search}&page=${page}&per_page=${perPage}`;
        if (campoOrdem) {
            url += `&campo=${campoOrdem}&ordem=${direcaoOrdem > 0 ? 'asc' : 'desc'}`;
        }
        const response = await fetch(url, {
            method: 'GET',
        });
        return response.json();
    },
    async createDesenvolvedores(desenvolvedor) {
        const response = await fetch(`${API_URL}/desenvolvedor`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(desenvolvedor)
        });
        return response.json();
    },
    async updateDesenvolvedores(id, desenvolvedor) {
        const response = await fetch(`${API_URL}/desenvolvedor/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(desenvolvedor)
        });
        return response.json();
    },
    async deleteDesenvolvedores(id) {
        const response = await fetch(`${API_URL}/desenvolvedor/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    }
}
