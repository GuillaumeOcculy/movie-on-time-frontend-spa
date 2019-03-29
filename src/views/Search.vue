<template>
  <div>
    <h1>Search</h1>
    <div class="row">
      <MovieListItem v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";
import MovieListItem from "@/components/MovieListItem.vue";

export default {
  components: {
    MovieListItem
  },
  data() {
    return {
      movies: []
    };
  },
  methods: {
    searchMovies() {
      MOTService.searchMovies(this.$route.query)
        .then(response => {
          this.movies = response.data["data"];
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    }
  },
  created() {
    this.searchMovies();
  }
};
</script>
