<template>
  <div>
    <h1>Search</h1>
    <div class="row">
      <template v-if="movieCount > 0">
        <MovieListItem v-for="movie in movies" :key="movie.id" :movie="movie" />
      </template>
      <template v-else>
        <div class="mt-3">
          <h2 class="text-center">
            We did not found movies with this query: {{ movieQuery }}
          </h2>
        </div>
      </template>
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
  computed: {
    movieCount: function() {
      return this.movies.length;
    },
    movieQuery: function() {
      return this.$route.query["q"];
    }
  },
  created() {
    this.searchMovies();
  }
};
</script>
