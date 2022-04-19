<template>
  <div class="default-layout">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="black" class="px-2">
        <b-navbar-brand href="#">Project creator</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <nav-link
              v-for="link in links"
              :key="link.path"
              :path="link.path"
              >{{ link.label }}</nav-link
            >
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <div class="d-flex">
                <b-form-input
                  size="sm"
                  class="mr-sm-2"
                  placeholder="Search project"
                ></b-form-input>
                <b-button variant="outline-light" size="sm">Primary</b-button>
              </div>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <body>
      <router-view />
    </body>
  </div>
</template>

<script>
import NavLink from "@/components/common/NavLink.vue";

export default {
  name: "DefaultLayout",
  components: {
    NavLink,
  },
  data() {
    return {
      links: [
        {
          path: "/",
          label: "Home",
        },
        {
          path: "/about",
          label: "About",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
a {
  text-decoration: none;
}
</style>
