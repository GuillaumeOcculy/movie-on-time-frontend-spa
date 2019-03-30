<template>
  <div>
    <h1 class="text-center">Sign in</h1>

    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <form @submit.prevent="submitForm">
            <div class="row mt-3">
              <div class="col">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="email"
                />
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
                <button type="submit" class="btn btn-primary btn-block">
                  Log in
                </button>
              </div>
            </div>
          </form>

          <div class="text-center">
            <router-link :to="{ name: 'signup' }" class="navbar-brand"
              >Don't have an account? Sign up</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";
export default {
  data() {
    return {
      email: null,
      password: null
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
    submitForm() {
      MOTService.signIn(this.form)
        .then(response => {
          console.log("Successful", response);
        })
        .catch(error => {
          console.log("There was an error:", error.response.data);
        });
    }
  }
};
</script>
