<template>
  <div class="default-layout">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="black" class="px-2">
        <b-navbar-brand href="#">Project creator</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/">
                <b-button variant="black" class="text-white" size="sm">Home</b-button>
              </router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/about">
                <b-button variant="black" class="text-white" size="sm">About</b-button>
              </router-link>
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <div class="d-flex">
                <b-form-input
                  size="sm"
                  class="mr-sm-2"
                  placeholder="Search project"
                ></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0">Search</b-button>
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
export default {
  name: "DefaultLayout",
};
</script>
<style lang="scss">
a {
  text-decoration: none;
}
</style>
