<template>
  <div class="model-card p-1">
    <b-alert variant="warning" :show="existDuplicateName">
      Exist duplicate col name
    </b-alert>
    <b-alert variant="warning" :show="existInvalidName">
      Exist invalid col name
    </b-alert>
    <b-alert variant="warning" :show="existInvalidAutoIncrement">
      Exist invalid auto increment col
    </b-alert>
    <b-table
      caption-top
      small
      bordered
      hover
      :fields="fields"
      :items="modelItems"
    >
      <template #table-caption>
        <div class="header d-flex justify-content-between align-items-center">
          <div>
            <div class="text-center text-dark d-flex align-items-center">
              Model
              <span class="pr-4 pl-4">
                <b>{{ modelName }}</b>
              </span>
            </div>
            <div class="text-center text-dark d-flex align-items-center">
              table
              <span class="pr-4 pl-4">
                <b v-if="!isEditable">{{ tableName }}</b>
                <b-form-input
                  v-else
                  type="text"
                  v-model="tableName"
                  placeholder="Table name"
                  :readonly="!isEditable"
                  size="sm"
                />
              </span>
            </div>
          </div>
          <div class="actions d-flex justify-content-center">
            <b-button-group>
              <b-button
                v-if="isEditable && !isChangedModel"
                size="sm"
                variant="outline-dark"
                @click="saveChange"
              >
                <b-icon icon="save"></b-icon>
              </b-button>
              <b-button
                v-if="isEditable"
                size="sm"
                variant="outline-dark"
                @click="initModel"
              >
                <b-icon icon="arrow-counterclockwise"></b-icon>
              </b-button>
              <b-button
                v-if="isEditable"
                size="sm"
                variant="outline-dark"
                @click="addRow()"
              >
                <b-icon icon="plus"></b-icon>
              </b-button>
              <b-button
                size="sm"
                :variant="`${isEditable ? 'dark' : 'outline-dark'}`"
                @click="toggleTableMode"
                ><b-icon icon="pen"
              /></b-button>
              <b-button size="sm" variant="outline-dark" @click="deleteAllCols"
                ><b-icon icon="trash"
              /></b-button>
            </b-button-group>
          </div>
        </div>
      </template>
      <template #cell(name)="data">
        <b-form-input
          type="text"
          v-model="data.item.name"
          placeholder="Name"
          :readonly="!isEditable"
        ></b-form-input>
      </template>
      <template #cell(primaryKey)="data">
        <b-form-checkbox
          :disabled="
            (existAutoIncrement && !data.item.primaryKey) || !isEditable
          "
          v-model="data.item.primaryKey"
        />
      </template>
      <template #cell(type)="data">
        <b-form-select
          v-model="data.item.type"
          :options="typeOption"
          :disabled="!isEditable"
        ></b-form-select>
      </template>
      <template #cell(autoIncrement)="data">
        <b-form-checkbox
          v-if="data.item.type === 'INTEGER'"
          v-model="data.item.autoIncrement"
          :disabled="!isEditable"
        />
      </template>
      <template #cell(allowNull)="data">
        <b-form-checkbox
          v-model="data.item.allowNull"
          :disabled="!isEditable"
        />
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
import _ from "lodash";
import { mapActions } from "vuex";
import types from "../../store/modules/projects/types";

export default {
  name: "ModelCard",
  props: {
    projectId: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      default: "Table name",
    },
    items: {
      type: Array,
      default: () => [],
    },
    tableParams: {
      type: Object,
      default: () => ({
        freezeTableName: true,
        paranoid: true,
        tableName: "",
        timestamps: true,
        underscored: true,
      }),
    },
  },
  data() {
    return {
      isEditable: false,
      editableItems: [],
      modelItems: [],
      modelName: "",
      tableName: "",
      typeOption: [
        "CHAR",
        "INTEGER",
        "VARCHAR",
        "STRING",
        "TEXT",
        "BOOLEAN",
        "FLOAT",
        "DOUBLE",
        "DATE",
      ],
      fields: [
        {
          key: "name",
          label: "Name",
        },
        {
          key: "primaryKey",
          label: "Primary Key",
        },
        {
          key: "type",
          label: "Type",
        },
        {
          key: "autoIncrement",
          label: "Auto Increment",
        },
        {
          key: "allowNull",
          label: "Allow Null",
        },
      ],
    };
  },
  watch: {
    items: {
      immediate: true,
      handler: "initModel",
    },
  },
  computed: {
    existAutoIncrement() {
      return this.modelItems.find(({ primaryKey }) => Boolean(primaryKey));
    },
    existInvalidAutoIncrement() {
      return this.modelItems.find(
        ({ autoIncrement, type }) =>
          Boolean(autoIncrement) && type !== "INTEGER"
      )?.name?.length;
    },
    existDuplicateName() {
      const names = this.modelItems.map(({ name }) => name.trim());
      return [...new Set(names)].length < this.modelItems.length;
    },
    existInvalidName() {
      return (
        this.modelItems.find(({ name }) => this.existNumber(name))?.name
          ?.length || false
      );
    },
    isChangedModel() {
      const isEqualModelCols = _.isEqual(this.items, this.modelItems);
      return [
        isEqualModelCols,
        this.tableName !== this.tableParams.name,
        this.modelName !== this.name,
      ].every((item) => item);
    },
  },
  methods: {
    ...mapActions("projects", {
      saveChangeModel: types.SAVE_CHANGE_PROJECT_MODELS,
    }),
    saveChange() {
      const body = {
        ["table-params"]: { ...this.tableParams, tableName: this.tableName },
        fields: Object.fromEntries(
          this.modelItems.map(({ name, ...params }) => [name, params])
        ),
        name: this.modelName,
      };
      const updatedModel = {
        body,
        prevName: this.name,
      };
      this.saveChangeModel({ projectId: this.projectId, body: updatedModel });
      this.isEditable = false;
    },
    initModel() {
      this.modelName = this.name;
      this.tableName = this.tableParams.tableName;
      this.modelItems = JSON.parse(JSON.stringify(this.items));
    },
    deleteAllCols() {
      this.modelItems = [];
    },
    existNumber(string) {
      return string.split("").find((char) => !isNaN(+char));
    },
    toggleTableMode() {
      this.isEditable = !this.isEditable;
    },
    addRow() {
      this.modelItems = [
        ...this.modelItems,
        { name: " ", type: "", allowNull: false },
      ];
    },
    allowShowValue(value) {
      return value?.length !== 0 && typeof value !== "boolean";
    },
  },
};
</script>
<!-- <style lang="scss">
.model-card {
  max-width: 350px;
  .table > :not(caption) > * > * {
    padding: 4px;
    text-align: center;
    cursor: pointer;
  }
}
</style> -->