import types from './types';

export default {
    [types.SET_PROJECTS](state, projects) {
        state.projects = projects;
    },
}