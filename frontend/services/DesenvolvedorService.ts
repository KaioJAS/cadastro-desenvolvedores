const API_URL = 'http://localhost:8000/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const DesenvolvedorService = {
    async getDesenvolvedores(search = '', page = 1, perPage = 10, campoOrdem = '', direcaoOrdem = 0) {
        let url = `${API_URL}/desenvolvedor?search=${search}&page=${page}&per_page=${perPage}`;
        if (campoOrdem) {
            url += `&campo=${campoOrdem}&ordem=${direcaoOrdem > 0 ? 'asc' : 'desc'}`;
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders()
        });
        return response.json();
    },
    async createDesenvolvedores(desenvolvedor) {
        const response = await fetch(`${API_URL}/desenvolvedor`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(desenvolvedor)
        });
        return response.json();
    },
    async updateDesenvolvedores(id, desenvolvedor) {
        const response = await fetch(`${API_URL}/desenvolvedor/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(desenvolvedor)
        });
        return response.json();
    },
    async deleteDesenvolvedores(id) {
        const response = await fetch(`${API_URL}/desenvolvedor/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return response.json();
    }
}
