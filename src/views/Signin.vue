<template>
  <div>
    <h1 class="text-center">Sign in</h1>

    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="text-center">
            <ul v-for="(error, index) in errors" :key="index">
              <p class="text-danger">{{ error }}</p>
            </ul>
          </div>

          <form @submit.prevent="login">
            <div class="row mt-3">
              <div class="col">
                <input type="email" class="form-control" placeholder="Email" v-model="email" />
              </div>
              <div class="col">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <button type="submit" class="btn btn-primary btn-block">Log in</button>
              </div>
            </div>
          </form>

          <div class="text-center">
            <router-link
              :to="{ name: 'signup' }"
              class="navbar-brand"
            >Don't have an account? Sign up</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      errors: []
    };
  },
  computed: {
    form: function() {
      return {
        email: this.email,
        password: this.password
      };
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", this.form)
        .then(() => {
          this.$router.push({ name: "home" });
          this.$router.go(0);
        })
        .catch(error => {
          this.errors = error.response.data;
        });
    }
  }
};
</script>
