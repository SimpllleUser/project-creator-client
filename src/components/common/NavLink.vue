<template>
  <div class="class-name">
    <b-nav-item>
      <router-link :to="path">
        <b-button variant="black" class="text-white" size="sm">
           <slot></slot>
        </b-button>
      </router-link>
    </b-nav-item>
  </div>
</template>

<script>
export default {
  name: "NavLink",
  props: {
    path: {
      type: String,
      required: true,
      default: "/",
    },
  },
};
</script>
