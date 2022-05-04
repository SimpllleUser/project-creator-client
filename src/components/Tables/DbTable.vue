<template>
  <div class="table">
    <div>
      <div>
        <b-button size="sm" @click="addItem">
          <span class="text-black">Add</span>
        </b-button>
        <b-button size="sm" @click="save">
          <span class="text-black">Save</span>
        </b-button>
      </div>
      <b-editable-table
        bordered
        class="editable-table"
        v-model="items"
        :fields="fields"
      >
        <template #cell(delete)="data">
          <div
            class="d-flex align-items-center justify-content-center"
            style="width: 100%"
          >
            <b-button variant="outline-dark" @click="deleteRow(data)" size="sm">
              <b-icon class="text-balck" icon="trash" />
            </b-button>
          </div>
        </template>
      </b-editable-table>
    </div>
  </div>
</template>
<script>
import BEditableTable from "bootstrap-vue-editable-table";

// const defaultItem = {
//   id: "-",
//   username: "-",
//   token: "-",
//   passwordss: "-",
// };

export default {
  name: "DbTable",
  components: {
    BEditableTable,
  },
  props: {
    keys: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    // ...mapState("app", ["typeOption"]),
    defaultItem() {
      const keyValue = this.keys.map(({ name }) => [name, '-']);
      return Object.fromEntries(keyValue);
    },
    fields() {
      const tableKeys = this.keys.map(({ name, type }) => ({
        key: name,
        label: name,
        editable: true,
        locale: "uk",
        type: this.getType(type),
      }));
      return [
        ...tableKeys,
        { key: "delete", label: "Delete", class: "table-cel" },
      ];
    },
  },
  methods: {
    getType(typeName) {
      const isTypeText = ["CHAR", "VARCHAR", "STRING", "TEXT"].includes(
        typeName
      );
      const isTypeNumber = ["INTEGER", "FLOAT", "DOUBLE"].includes(typeName);
      const isTypeDate = ["DATE"].includes(typeName);
      const isTypeBoolean = ["BOOLEAN"].includes(typeName);
      const typeStatus = {
        text: isTypeText,
        number: isTypeNumber,
        date: isTypeDate,
        checkbox: isTypeBoolean,
      };
      return Object?.keys(typeStatus)?.find((key) => typeStatus[key]);
    },
    addItem() {
      const defaultItem = JSON.parse(JSON.stringify(this.defaultItem));
      this.items = [...this.items, defaultItem];
    },
    deleteRow({ index }) {
      this.items = this.items.filter((_, indexRow) => indexRow !== index);
    },
    save() {
      console.log('saved table ', this.items);
    },
  },
  mounted() {
    this.addItem();
  },
};
</script>\
<style lang="scss">
.editable-table {
  width: 100% !important;
}
.data-cell {
  padding: 5px;
  text-align: center;
}
</style>