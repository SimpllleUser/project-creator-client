<template>
  <div class="model-form">
    <!-- <b-form @submit="onSubmit">
      <div class="row">
      <b-table :fields="fields">
      </b-table>
        <b-form-group label="Name:">
          <b-form-input id="model-name" type="text" v-model="name" required />
        </b-form-group>
        <b-form-group label="Primary Key:">
          <b-form-checkbox id="model-primary" v-model="primaryKey" />
        </b-form-group>
        <b-form-group label="Type:">
          <b-form-select id="model-type" v-model="type" required />
        </b-form-group>
        <b-form-group label="Auto increment:">
          <b-form-checkbox id="model-autoincrement" v-model="autoIncrement" />
        </b-form-group>
        <b-form-group label="Allow null:">
          <b-form-checkbox id="model-allownull" v-model="allowNull" required />
        </b-form-group>
      </div>
    </b-form> -->
  </div>
</template>
<script>
export default {
  name: "ModelForm",
  props: {
    model: {
      type: Object,
      require: false,
      //   default: () => ({
      //     name: "",
      //     primaryKey: false,
      //     type: "",
      //     autoIncrement: false,
      //     allowNull: false,
      //   }),
    },
  },
  data() {
    return {
      name: "",
      primaryKey: false,
      type: "",
      autoIncrement: false,
      allowNull: false,
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
  methods: {
    onSubmit(event) {
      event.preventDefault();
    },
  },
};
</script>
<style lang="scss">
</style>