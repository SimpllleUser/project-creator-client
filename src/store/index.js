import Vue from 'vue';
import Vuex from 'vuex';
// import empty from '@/store/modules/empt';
import projects from '@/store/modules/projects';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects,
  },
});
