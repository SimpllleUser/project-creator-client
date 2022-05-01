<template>
  <div class="model-card">
    <b-table caption-top small bordered hover :items="items">
      <template #table-caption>
        <div class="header d-flex justify-content-between align-items-center">
          <div class="text-center text-dark">
            Model
            <span>
              <b>{{ name }}</b></span
            >
          </div>
          <div class="actions">
            <b-button size="sm" variant="outline-dark"
              ><b-icon icon="pen"
            /></b-button>
            <b-button size="sm" variant="outline-dark"
              ><b-icon icon="trash"
            /></b-button>
          </div>
        </div>
      </template>
      <template #cell()="data">
        <div>
          <div v-if="allowShowValue(data.value)">
            {{ data.value }}
          </div>
          <div v-else>
            <b-icon v-if="data.value" icon="check" />
            <b-icon v-else icon="x" />
          </div>
        </div>
      </template>
      <template #head()="scope">
        <div class="text-nowrap">
          {{ scope.label }}
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "ModelCard",
  props: {
    name: {
      type: String,
      default: "Table name",
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    allowShowValue(value) {
      return value?.length !== 0 && typeof value !== "boolean";
    },
  },
};
</script>
<style lang="scss">
.model-card {
  max-width: 350px;
  .table > :not(caption) > * > * {
    padding: 4px;
    text-align: center;
    cursor: pointer;
  }
}
</style>