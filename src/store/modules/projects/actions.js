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
    async [types.CREATE_PROJECT]({ commit }, projectBody) {
        const project = await projectRepository.create(projectBody);
        commit(types.ADD_PROJECT, project);
    },
    async [types.DELETE_PROJECT]({ commit }, id) {
        await projectRepository.delete(id);
        commit(types.SET_DELETE_PROJECT, id);
    },
    async [types.UPDATE_PROJECT]({ commit }, updatedProject) {
        const project = await projectRepository.update(updatedProject);
        commit(types.SET_UPDATE_PROJECT, project);
    },
    async [types.GET_PROJECT_MODELS]({ commit }, projectId) {
        const models = await projectRepository.getModels(projectId);
        commit(types.SET_PROJECT_MODELS, { projectId, models });
    },
    async [types.SAVE_CHANGE_PROJECT_MODELS](_, params) {
        await projectRepository.updateModels(params);
    },
}