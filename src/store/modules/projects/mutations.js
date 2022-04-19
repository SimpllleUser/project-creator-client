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
}