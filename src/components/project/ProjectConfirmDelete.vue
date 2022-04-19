<template>
  <b-modal :id="id" class="project-confirm-delete" hide-footer hide-header>
    <div class="project-confirm-delete--body">
      <b-alert show variant="danger">
        <h2>Do you Want to delete project {{ project.title }}</h2>
      </b-alert>
    </div>
    <div class="project-confirm-delete--footer d-flex justify-content-end">
      <b-button-group size="sm">
        <b-button size='sm' variant='outline-dark' @click="deleteHandlerProject">Yes</b-button>
        <b-button size='sm' variant='outline-dark' @click="$bvModal.hide(id)">No</b-button>
      </b-button-group>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import types from "@/store/modules/projects/types";

export default {
  name: "ProjectConfirmDelete",
  props: {
    id: {
      type: String,
      require: true,
      default: () => "",
    },
    project: {
      type: Object,
      require: true,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions("projects", { deleteProject: types.DELETE_PROJECT }),
    async deleteHandlerProject() {
      await this.deleteProject(this.project.id);
      this.$bvModal.hide(this.id);
    },
  },
};
</script>
