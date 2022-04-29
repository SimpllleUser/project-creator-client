<template>
  <b-modal :id="id" :title="modalTitle" hide-header-close hide-footer>
    <b-form @submit="onSubmit">
      <div class="form-body pb-2">
        <b-form-group id="input-group-name" label="name" label-for="name">
          <b-form-input
            id="name"
            v-model="projectModel.title"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-description"
          label="description"
          label-for="description"
        >
          <b-form-input
            id="description"
            v-model="projectModel.description"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="form-footer d-flex justify-content-end">
        <b-button variant="outline-dark" type="submit">
          {{ buttonLabel }}
        </b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import types from "@/store/modules/projects/types";

export default {
  name: "ProjectForm",
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
    project: {
      type: Object,
      required: false,
      default: () => ({
        id: null,
        title: null,
        description: null,
      }),
    },
  },
  data() {
    return {
      projectModel: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    isEditableForm() {
      return Boolean(this.project?.id);
    },
    modalTitle() {
      return `Form ${this.isEditableForm ? "edit" : "create"} project`;
    },
    buttonLabel() {
      return this.isEditableForm ? "Save" : "Create";
    },
    actionOnSubmit() {
      return this.isEditableForm ? this.saveProject : this.createProject;
    },
  },
  watch: {
    project: {
      immediate: true,
      handler(project) {
        this.projectModel = { ...this.projectModel, ...project };
      },
    },
  },
  methods: {
    ...mapActions("projects", {
      saveProject: types.UPDATE_PROJECT,
      createProject: types.CREATE_PROJECT,
    }),
    async onSubmit(event) {
      event.preventDefault();
      await this.actionOnSubmit(this.projectModel);
      this.projectModel = {};
      this.$bvModal.hide(this.id);
    },
  },
};
</script>
