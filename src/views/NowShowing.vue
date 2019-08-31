<template>
  <div>
    <MovieList
      @query-entered="fetchMovies"
      @pagination-clicked="fetchMovies"
      :meta="meta"
      :movies="movies"
    />

    <Footer v-if="moviesFetched" />
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";
import MovieList from "@/components/MovieList.vue";
import Footer from "@/components/Footer.vue";

export default {
  metaInfo: {
    title: "Now Showing"
  },
  components: {
    MovieList,
    Footer
  },
  data() {
    return {
      movies: [],
      moviesFetched: false,
      meta: {}
    };
  },
  methods: {
    fetchMovies: function(payload) {
      MOTService.getNowShowing(payload)
        .then(response => {
          this.movies = response.data["data"];
          this.meta = response.data["meta"];
          this.moviesFetched = true;
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
