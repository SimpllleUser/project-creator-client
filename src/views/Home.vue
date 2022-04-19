<template>
  <div class="home">
    <project-list :projects="projects" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import types from "@/store/modules/projects/types";
import ProjectList from "@/components/project/ProjectList.vue";

export default {
  name: "Home",
  components: {
    ProjectList,
  },
  computed: {
    ...mapState("projects", ["projects"]),
  },
  methods: {
    ...mapActions("projects", { getProjects: types.GET_PROJECTS }),
  },
  async mounted() {
    await this.getProjects();
  },
};
</script>
