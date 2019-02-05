<template>
  <div>
    <MovieHeaderLinkList />

    <div class="row" v-if="cinemas.length > 0">
      <form class="form-inline">
        <div class="form-group mx-sm-3 mb-2">
          <label for="inputPassword2" class="sr-only">Password</label>
          <input
            type="text"
            class="form-control"
            placeholder="Search Cinema"
            v-model="search"
          />
        </div>
        <div class="form-group mb-2">
          <label for="staticEmail2" class="sr-only">Email</label>
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            id="staticEmail2"
            :value="'Results: ' + filteredCinemas.length"
          />
        </div>
      </form>
    </div>

    <div class="row">
      <CinemaCard
        v-for="cinema in filteredCinemas"
        :cinema="cinema"
        :key="cinema.id"
      />
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
      search: ""
    };
  },
  computed: {
    filteredCinemas: function() {
      return this.cinemas.filter(cinema => {
        return cinema.attributes.name
          .toLowerCase()
          .match(this.search.toLowerCase());
      });
    }
  },
  created() {
    MOTService.getCinemas()
      .then(response => {
        this.cinemas = response.data["data"];
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>

<style scoped></style>
