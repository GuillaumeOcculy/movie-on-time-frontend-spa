<template>
  <div>
    <div class="row">
      <MovieListItem v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>

    <div class="mt-3 text-center">
      <h2 v-if="movieCount == 0 && doneFetching">
        We did not found movies with this query: {{ movieQuery }}
      </h2>
      <h2 v-if="!doneFetching">Loading...</h2>
    </div>
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";
import MovieListItem from "@/components/MovieListItem.vue";

export default {
  metaInfo: {
    title: "Search"
  },
  components: {
    MovieListItem
  },
  data() {
    return {
      movies: [],
      doneFetching: false
    };
  },
  methods: {
    searchMovies() {
      MOTService.searchMovies(this.$route.query)
        .then(response => {
          this.movies = response.data["data"];
          this.doneFetching = true;
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
