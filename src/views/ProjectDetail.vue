<template>
  <div class="about">
    <h1>Project detail {{ id }}</h1>
    <div>
      <model-form :projectId="Number(id)" />
    </div>

    <div class="p-2">
      <h4><b-button v-b-toggle.models variant="dark">Models</b-button></h4>
    </div>
    <b-collapse id="models" class="p-1">
      <b-button size="sm" @click="$bvModal.show('model-form')"
        >Add model</b-button
      >
      <div v-for="{ model } in projectModels" :key="model.name">
        <model-card
          :project-id="Number(id)"
          :name="model.name"
          :items="getArrayFromObject(model.fields)"
          :table-params="model['table-params']"
        />
      </div>
    </b-collapse>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import ModelCard from "../components/Model/ModelCard.vue";
import ModelForm from "../components/Model/ModelForm.vue";
import types from "../store/modules/projects/types";

export default {
  components: { ModelCard, ModelForm },
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
    ...mapActions("projects", {
      getModels: types.GET_PROJECT_MODELS,
    }),
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
