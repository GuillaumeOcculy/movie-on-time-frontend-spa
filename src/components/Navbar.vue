<template>
  <nav class="navbar navbar-expand bg-white">
    <div class="container">
      <router-link to="/" class="navbar-brand main-title"
        >Movie On Time</router-link
      >

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
          <form class="form-inline" @submit.prevent="submit">
            <input
              class="form-control mr-sm-1"
              type="search"
              v-model="query"
              placeholder="Search..."
              aria-label="Search"
              autofocus
            />
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
              <div class="dropdown">
                <img
                  :src="profileAvatar"
                  height="30px"
                  class="dropdown-toggle avatar"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                />
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <router-link
                    :to="{ name: 'favorite-cinemas' }"
                    class="dropdown-item"
                    >My cinemas</router-link
                  >
                  <router-link :to="{ name: 'watchlist' }" class="dropdown-item"
                    >Watchlist</router-link
                  >
                  <router-link :to="{ name: 'watched' }" class="dropdown-item"
                    >Watched</router-link
                  >
                  <div class="dropdown-divider"></div>

                  <a href="#" class="dropdown-item" @click.prevent="logout()"
                    >Log out</a
                  >
                </div>
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
import profileAvatar from "@/assets/images/icons/user.svg";
export default {
  data() {
    return {
      query: "",
      profileAvatar
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
.main-title {
  color: #484848;
}
.container {
  max-width: 1275px;
}
@media (max-width: 768px) {
  .form-control {
    max-width: 100px;
  }
}

a:hover {
  color: #e53935;
}

.avatar {
  cursor: pointer;
}
</style>
