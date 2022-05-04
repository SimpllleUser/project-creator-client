<template>
  <div class="table">
    <h1>Table</h1>
    <div>
      <div>
        <b-button size="sm" @click="addItem">
          <span class="text-black">Add</span>
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
// import { mapState } from "vuex";
const defaultItem = {
  id: "-",
  username: "-",
  token: "-",
  passwordss: "-",
};
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
      items: [defaultItem],
    };
  },
  computed: {
    // ...mapState("app", ["typeOption"]),
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
      this.items = [...this.items, defaultItem];
    },
    deleteRow({ index }) {
      this.items = this.items.filter((_, indexRow) => indexRow !== index);
    },
  },
};
</script>\
<style lang="scss">
.data-cell {
  padding: 5px;
  text-align: center;
}
</style>