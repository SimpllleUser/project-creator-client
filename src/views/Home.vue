<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import projectTypes from '../store/modules/projects/types';
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  methods: {
    ...mapActions('projects', { getProjects: projectTypes.GET_PROJECTS }),
  },
  async mounted() {
    await this.getProjects();
  }
}
</script>
