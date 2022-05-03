<template>
  <div class="about">
    <h1>Project detail {{ id }}</h1>
    <div v-for="{ model } in projectModels" :key="model.name">
      <model-card
        :project-id="Number(id)"
        :name="model.name"
        :items="getArrayFromObject(model.fields)"
        :table-params="model['table-params']"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import ModelCard from "../components/Model/ModelCard.vue";
import types from "../store/modules/projects/types";

export default {
  components: { ModelCard },
  name: "ProjectDetail",
  props: {
    id: {
      type: String,
    },
  },
  datat() {
    return {
      projectModels: null,
    };
  },
  methods: {
    ...mapActions("projects", { getModels: types.GET_PROJECT_MODELS }),
    getArrayFromObject(object) {
      const keys = Object.keys(object);
      return keys.map((key) => ({ name: key, ...object[key] }));
    },
  },
  computed: {
    ...mapState("projects", ["models"]),
    projectModels() {
      return this.models[`${this.id}`];
    },
  },
  watch: {
    id: {
      immediate: true,
      async handler(id) {
        await this.getModels(id);
      },
    },
  },
};
</script>
