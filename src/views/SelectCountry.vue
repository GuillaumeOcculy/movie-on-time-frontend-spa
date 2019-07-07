<template>
  <div class="mt-3">
    <!-- <h1 class="text-center">Select Country</h1> -->

    <div class="text-center">
      <p class="lead">Unfortunatly, France is the only country available for now.</p>
      <p>You can ask to add your country by filling the form below.</p>
    </div>
    <div class="jumbotron">
      <div class="text-center">
        <h2 v-if="poll">{{ poll.attributes.body }}</h2>
      </div>

      <div class="d-flex justify-content-center">
        <form class="form-inline" @submit.prevent="submit">
          <div class="form-group mx-sm-3 mb-2">
            <select class="custom-select" v-model="country">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary mb-2">Add my country</button>
        </form>
      </div>
      <hr class="my-4" />

      <div>
        <!-- <div v-for="answer in answers"> -->
        <button
          type="button"
          class="btn btn-primary mr-3"
          v-for="answer in answers"
          :key="answer.id"
        >
          {{ answer.attributes.body }}
          <span
            class="badge badge-light"
          >{{ answer.attributes.vote_count }}</span>
        </button>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";

export default {
  data() {
    return {
      poll: null,
      answers: [],
      country: null
    };
  },
  computed: {
    form: function() {
      return {
        pollId: this.poll.id,
        body: this.country
      };
    }
  },
  methods: {
    submit() {
      if (!localStorage.user) {
        alert("You must be logged in");
        return;
      }
      MOTService.answerToPoll(this.form)
        .then(response => {
          this.answers = response.data.included;
          this.poll = response.data.data;
        })
        .catch(error => {
          var data = error.response.data;
          var errors = JSON.stringify(data, null, 4);

          alert(errors);
        });
    }
  },
  created() {
    MOTService.getCountryPoll().then(response => {
      this.answers = response.data.included;
      this.poll = response.data.data;
    });
  }
};
</script>

<style scoped></style>
