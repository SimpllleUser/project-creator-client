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
    [types.DELETE_PROJECT](state, projectId) {
        state.project = {
            ...state.project,
            [`${projectId}`]: null,
        };
    },
}