<template>
  <nav class="navbar navbar-expand-lg bg-white">
    <div class="container">
      <router-link to="/" class="navbar-brand">Movie On Time</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              v-model="query"
              autofocus
              placeholder="Enter a movie title"
              aria-label="Search"
            />
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              @click.stop.prevent="submit()"
            >
              Search
            </button>
          </form>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              v-if="!loggedIn"
              :to="{ name: 'signin' }"
              class="navbar-brand"
              >Sign in</router-link
            >

            <template v-else>
              <div>
                <b-dropdown
                  size="lg"
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                >
                  <template slot="button-content">
                    &#x1F464;
                    <span class="sr-only">Profile</span>
                  </template>
                  <b-dropdown-item href="/favorite-cinemas"
                    >Cinemas</b-dropdown-item
                  >
                  <b-dropdown-item href="/watchlist">Watchlist</b-dropdown-item>
                  <b-dropdown-item href="/watched">Watched</b-dropdown-item>
                  <b-dropdown-item href="#" @click.prevent="logout()"
                    >Log out</b-dropdown-item
                  >
                </b-dropdown>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { authComputed } from "../vuex/helpers.js";

export default {
  data() {
    return {
      query: ""
    };
  },
  methods: {
    submit() {
      this.$router.push({ name: "search-movies", query: { q: this.query } });
      this.$router.go(0);
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.go(0);
      });
    }
  },
  computed: {
    ...authComputed
  }
};
</script>
<style scoped>
.container {
  max-width: 1300px;
}
a:hover {
  color: #e53935;
}
</style>
