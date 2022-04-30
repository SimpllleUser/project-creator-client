<template>
  <div class="model-card">
    <b-table bordered hover :items="items">
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
    </b-table>
  </div>
</template>

<script>
export default {
  name: "ModelCard",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    allowShowValue(value) {
      return value?.length !== 0 && typeof value !== 'boolean';
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