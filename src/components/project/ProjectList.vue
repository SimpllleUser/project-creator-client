<template>
  <div class="projects-list p-1">
    <div
      class="
        projects-list--header
        d-flex
        justify-content-between
        alert alert-dark
      "
    >
      <!-- <router-link :to="'/home'">Home</router-link> -->
      <project-form id="create-project" />
      <div class="projects-list--header-title"><h4>Projects</h4></div>
      <div class="projects-list--header-actions">
        <b-button
          variant="outline-dark"
          size="sm"
          @click="$bvModal.show('create-project')"
          ><b>Create</b></b-button
        >
      </div>
    </div>
    <div class="projects-list--body">
      <b-table :items="projects" :fields="fields" striped hover>
        <template #cell(createdAt)="data">
          {{ new Date(data.item.createdAt).toLocaleString() }}
        </template>
        <template #cell(title)="data">
          <div>
            <b-button variant="link">
              <router-link :to="`/project/${data.item.id}`">
                {{ data.item.title }}
              </router-link>
            </b-button>
          </div>
        </template>
        <template #cell(actions)="data">
          <div class="d-none"></div>
          <project-form
            :id="`edit-project-${data.item.id}`"
            :project="data.item"
          />
          <project-confirm-delete
            :id="`delete-project-${data.item.id}`"
            :project="data.item"
          />
          <b-button-group size="sm">
            <b-button
              variant="outlined-dark"
              @click="$bvModal.show(`edit-project-${data.item.id}`)"
              ><b-icon icon="pen" size="sm"
            /></b-button>
            <b-button
              variant="outlined-dark"
              @click="$bvModal.show(`delete-project-${data.item.id}`)"
              ><b-icon icon="trash" size="sm"
            /></b-button>
          </b-button-group>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import ProjectConfirmDelete from "./ProjectConfirmDelete.vue";
import ProjectForm from "./ProjectForm.vue";
export default {
  components: { ProjectForm, ProjectConfirmDelete },
  name: "ProjectList",
  props: {
    projects: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data() {
    return {
      fields: ["title", "description", "createdAt", "actions"],
    };
  },
};
</script>
