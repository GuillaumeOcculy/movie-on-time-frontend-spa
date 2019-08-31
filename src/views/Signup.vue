<template>
  <div>
    <h1 class="text-center">Sign up</h1>

    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="text-center">
            <ul v-for="(values, key, index) in errors" :key="index">
              <p
                v-for="(value, index) in values"
                :key="index"
                class="text-danger"
              >{{ key }} {{ value }}</p>
            </ul>
          </div>
          <form @submit.prevent="register">
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
                <input type="text" class="form-control" placeholder="Last name" v-model="lastName" />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="email"
                  required
                />
              </div>
              <div class="col">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                  required
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <button type="submit" class="btn btn-primary btn-block">Register</button>
              </div>
            </div>
          </form>

          <div class="text-center">
            <router-link
              :to="{ name: 'signin' }"
              class="navbar-brand"
            >Already have an account? Sign in</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  metaInfo: {
    title: "Sign Up"
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      errors: []
    };
  },
  computed: {
    form: function() {
      let obj = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password
      };

      obj = _.pickBy(obj, _.identity);
      return obj;
    }
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", this.form)
        .then(() => {
          this.$router.push({ name: "home" });
          this.$router.go(0);
        })
        .catch(error => {
          // var data = error.response.data;
          this.errors = error.response.data;
          // var errors = JSON.stringify(data, null, 4);

          // alert(errors);
        });
    }
  }
};
</script>
