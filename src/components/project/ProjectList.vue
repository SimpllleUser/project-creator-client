<template>
  <div class="projects-list p-1">
    <div
      class="projects-list--header d-flex justify-content-between alert alert-dark"
    >
      <div class="projects-list--header-title"><h4>Projects</h4></div>
      <div class="projects-list--header-actions">
        <b-button variant="dark" size="sm">Create</b-button>
      </div>
    </div>
    <div class="projects-list--body">
      <b-table :items="projects" :fields="fields" striped hover>
        <template #cell(createdAt)="data">
          {{ new Date(data.item.createdAt).toLocaleString() }}
        </template>
        <template #cell(actions)="data">
          <div class="d-none">
            {{ data.item.id }}
          </div>
          <b-button-group size="sm">
            <b-button variant="outlined-dark"
              ><b-icon icon="pen" size="sm"
            /></b-button>
            <b-button variant="outlined-dark"
              ><b-icon icon="trash" size="sm"
            /></b-button>
          </b-button-group>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
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
