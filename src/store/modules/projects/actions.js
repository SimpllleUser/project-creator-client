import types from './types';
import projectRepository from './repository';

export default {
    async [types.GET_PROJECTS]({ commit }) {
        const projects = await projectRepository.getAll();
        commit(types.SET_PROJECTS, projects);
    },
    async [types.GET_PROJECT]({ commit }, id) {
        const project = await projectRepository.getById(id);
        commit(types.SET_PROJECT, project);
    },
    async [types.DELETE_PROJECT]({ commit }, id) {
        const isDeleted = await projectRepository.getById(id);
        if (!isDeleted) return;
        commit(types.SET_DELETE_PROJECT, id);
    },
}