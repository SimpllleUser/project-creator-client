import client from '../../../services/client-http';
const defaultURL = 'project';

export default {
    async getAll() {
        const result = await client.get(defaultURL);
        return result;
    },
    async getById(id) {
        const result = await client.get(`${defaultURL}/${id}`);
        return result;
    },
    async delete(id) {
        const result = await client.get(`${defaultURL}/${id}`);
        return result;
    },
};