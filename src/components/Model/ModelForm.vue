<template>
  <b-modal id="model-form" hide-footer hide-header>
    <div>
      <b-form @submit="onSubmit">
        <div class="row">
          <b-form-group
            id="input-group-name"
            label="Model name"
            label-for="name"
          >
            <b-form-input
              id="name"
              v-model="name"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-table-name"
            label="Table name"
            label-for="name"
          >
            <b-form-input
              id="name"
              v-model="tableName"
              type="tableName"
              required
            />
          </b-form-group>
        </div>
        <div class="p-1">
          <div class="ml-auto">
            <b-button type="submit" variant="dark" class="ml-auto"
              >Add</b-button
            >
          </div>
        </div>
      </b-form>
    </div>
  </b-modal>
</template>
<script>
import { mapMutations } from "vuex";
import types from "../../store/modules/projects/types";

export default {
  name: "ModelForm",
  props: {
    projectId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      name: "",
      tableName: "",
    };
  },
  methods: {
    ...mapMutations("projects", {
      addModel: types.ADD_PROJECT_MODEL,
    }),
    onSubmit(event) {
      event.preventDefault();
      const templateModel = {
        "table-params": {
          timestamps: true,
          paranoid: true,
          underscored: true,
          freezeTableName: true,
          tableName: this.tableName,
        },
        fields: {},
        name: this.name,
      };
      this.addModel({ projectId: this.projectId, model: templateModel });
      this.$bvModal.hide("model-form");
    },
  },
};
</script>