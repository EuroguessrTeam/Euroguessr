export class API {
    private static instance: API;
    private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL;

    private constructor() {}

    static getInstance(): API {
        if (!API.instance) {
            API.instance = new API();
        }
        return API.instance;
    }

    async get(path: string): Promise<any> {
        const response = await fetch(`${API.BASE_URL}${path}`);
        return await response.json();
    }

    async post(path: string, body: any): Promise<any> {
        const response = await fetch(`${API.BASE_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        return await response.json();
    }

    async put(path: string, body: any): Promise<any> {
        const response = await fetch(`${API.BASE_URL}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        return await response.json();
    }

    async delete(path: string): Promise<any> {
        const response = await fetch(`${API.BASE_URL}${path}`, {
            method: 'DELETE',
        });
        return await response.json();
    }
}