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
        const { data } = await client.delete(`${defaultURL}/${id}`);
        return data;
    },
    async create(project) {
        const { data } = await client.post(defaultURL, project);
        return data;
    },
    async update(project) {
        const { data } = await client.patch(`${defaultURL}/${project.id}`, project);
        return data;
    },
};