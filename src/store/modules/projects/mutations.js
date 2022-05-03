import types from './types';

export default {
    [types.SET_PROJECTS](state, projects) {
        state.projects = projects;
    },
    [types.SET_PROJECT](state, project) {
        state.project = {
            ...state.project,
            [`${project.id}`]: project,
        };
    },
    [types.SET_DELETE_PROJECT](state, projectId) {
        state.projects = state.projects.filter(({ id }) => id !== projectId);
        if (!state.project[`${projectId || 'none'}`]) return;
        state.project = {
            ...state.project,
            [`${projectId}`]: null,
        };
    },
    [types.ADD_PROJECT](state, project) {
        state.projects = [project, ...state.projects];
    },
    [types.SET_UPDATE_PROJECT](state, updatedProject) {
        /// updated project in list ---
        const filteredProjects = state.projects.filter(({ id }) => id !== updatedProject.id);
        state.projects = [updatedProject, ...filteredProjects];
        /// updated project in detail ---
        state.project = {
            ...state.project,
            [`${updatedProject.id}`]: updatedProject,
        };
    },
    [types.SET_PROJECT_MODELS](state, { projectId, models }) {
        const projectModelsState = state.models;
        state.models = {
            ...projectModelsState,
            [`${projectId}`]: models,
        };
    },
    [types.ADD_PROJECT_MODEL](state, { projectId, model }) {
        const projectModelsState = state.models;
        const updatedModel = [...projectModelsState[`${projectId}`], { model }];
        state.models = {
            ...projectModelsState,
            [`${projectId}`]: updatedModel,
        };
    },
}