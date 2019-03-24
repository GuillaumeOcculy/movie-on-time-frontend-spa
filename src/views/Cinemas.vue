<template>
  <div>
    <MovieHeaderLinkList />

    <div class="row mt-2" v-if="cinemas.length > 0">
      <form class="form-inline">
        <div class="form-group mx-sm-3 mb-2">
          <label for="inputPassword2" class="sr-only">Password</label>
          <input
            type="text"
            class="form-control"
            placeholder="Search Cinema"
            v-model="query"
            @input="search_cinemas"
          />
        </div>
        <div class="form-group mb-2">
          <label for="staticEmail2" class="sr-only">Email</label>
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            id="staticEmail2"
            :value="'Cinemas: ' + cinemas.length"
          />
        </div>
      </form>
    </div>

    <div class="row">
      <CinemaCard v-for="cinema in cinemas" :cinema="cinema" :key="cinema.id" />
    </div>
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";
import CinemaCard from "@/components/CinemaCard.vue";

export default {
  components: {
    MovieHeaderLinkList,
    CinemaCard
  },
  data() {
    return {
      cinemas: [],
      query: ""
    };
  },
  computed: {
    payload: function() {
      return { query: this.query };
    }
  },
  methods: {
    search_cinemas() {
      MOTService.getCinemas(this.payload)
        .then(response => {
          this.cinemas = response.data["data"];
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    }
  },
  created() {
    this.search_cinemas();
  }
};
</script>

<style scoped></style>
