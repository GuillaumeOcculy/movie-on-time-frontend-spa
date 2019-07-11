<template>
  <div class="mt-3">
    <div class="jumbotron">
      <div class="text-center">
        <p class="lead">
          Unfortunatly, France is the only country available for now.
        </p>

        <h1 v-if="poll">{{ poll.attributes.body }}</h1>
        <p>You can ask to add your country by filling the form below</p>
      </div>

      <div class="d-flex justify-content-center">
        <form class="form-inline" @submit.prevent="submit">
          <div class="form-group mx-sm-3 mb-2">
            <select class="custom-select" v-model="selectedCountry" required>
              <option v-for="country in countries" :key="country.name">
                {{ country.name }}
              </option>
            </select>

            <input
              required
              v-if="!loggedIn"
              type="email"
              class="form-control ml-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="selectedEmail"
            />
          </div>
          <button type="submit" class="btn btn-primary mb-2">
            Add my country
          </button>
        </form>

        <br />
      </div>

      <div class="text-center">
        <ul v-for="(error, index) in errors" :key="index">
          <p class="text-danger">{{ error }}</p>
        </ul>
      </div>
      <hr class="my-4" />

      <div>
        <button
          type="button"
          class="btn btn-primary mr-3 mt-3"
          v-for="answer in answers"
          :key="answer.id"
          @click="vote(answer.attributes.body)"
        >
          {{ answer.attributes.body }}
          <span class="badge badge-light">{{
            answer.attributes.vote_count
          }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";
import dataCountries from "@/datas/countries.json";
import { authComputed } from "../vuex/helpers.js";
import _ from "lodash";

export default {
  data() {
    return {
      poll: null,
      answers: [],
      countries: [],
      selectedCountry: null,
      selectedEmail: null,
      errors: []
    };
  },
  computed: {
    form: function() {
      return {
        pollId: this.poll.id,
        body: this.selectedCountry,
        email: this.selectedEmail
      };
    },
    ...authComputed
  },
  methods: {
    vote(value) {
      this.selectedCountry = value;
      this.submit();
    },
    updatePoll(response) {
      let answers = response.data.included.sort(country => country.name);
      this.answers = _.sortBy(answers, "attributes.body");
      this.poll = response.data.data;
    },
    submit() {
      MOTService.answerToPoll(this.form)
        .then(response => {
          this.updatePoll(response);
          this.errors = [];

          alert("Thanks for your vote !");
        })
        .catch(error => {
          this.errors = error.response.data;
        });
    },
    getCountriesList: function() {
      this.countries = dataCountries;
    }
  },
  created() {
    MOTService.getCountryPoll().then(response => {
      this.updatePoll(response);
    });

    this.countries = dataCountries;
  }
};
</script>

<style scoped></style>
