<template>
  <div>
    <h1 class="text-center">Sign up</h1>

    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <form @submit.prevent="submitForm">
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="First name"
                  v-model="firstName"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                  v-model="lastName"
                />
              </div>
            </div>
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
                  Register
                </button>
              </div>
            </div>
          </form>
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
      firstName: null,
      lastName: null,
      email: null,
      password: null
    };
  },
  computed: {
    form: function() {
      return {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password
      };
    }
  },
  methods: {
    submitForm() {
      MOTService.createUser(this.form)
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
