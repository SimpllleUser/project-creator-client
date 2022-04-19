import client from '../../../services/client-http';
const defaultURL = 'project';

export default {
    async getAll() {
        const { data } = await client.get(defaultURL);
        return data;
    },
    async getById(id) {
        const { data } = await client.get(`${defaultURL}/${id}`);
        return data;
    },
    async delete(id) {
        const { data } = await client.get(`${defaultURL}/${id}`);
        return data;
    },
};