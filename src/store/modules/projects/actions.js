import types from './types';
import projectRepository from './repository';

export default {
    async [types.GET_PROJECTS](commit) {
        const projects = await projectRepository.getAll();
        commit(types.SET_PROJECTS, projects);
    }
}