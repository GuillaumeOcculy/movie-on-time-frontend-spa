<template>
  <MovieList
    @query-entered="fetchMovies"
    @pagination-clicked="fetchMovies"
    :meta="meta"
    :movies="movies"
  />
</template>

<script>
import MOTService from "@/services/MOTService.js";
import MovieList from "@/components/MovieList.vue";

export default {
  metaInfo: {
    title: "Reprojection"
  },
  components: {
    MovieList
  },
  data() {
    return {
      movies: [],
      meta: {}
    };
  },
  methods: {
    fetchMovies: function(page) {
      MOTService.getReprojection(page)
        .then(response => {
          this.movies = response.data["data"];
          this.meta = response.data["meta"];
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    }
  },
  created() {
    this.fetchMovies();
  }
};
</script>
