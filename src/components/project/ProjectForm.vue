<template>
  <div class="project-form">
    <b-form @submit="onSubmit">
      <div class="form-body">
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
      <div class="form-footer">
        <b-button variant="outlined-dark">
          {{ buttonLabel }}
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
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
    buttonLabel() {
      return this.projectModel?.id ? "Save" : "Create";
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
    onSubmit(event) {
      event.preventDefault();
      this.$bvModal.hide(this.id);
    },
  },
};
</script>
