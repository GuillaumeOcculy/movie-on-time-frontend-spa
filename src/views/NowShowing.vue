<template>
  <div>
    <MovieHeaderLinkList />

    <AppPagination :meta="meta" @pagination-clicked="fetchMovies" />

    <div class="row">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>

    <AppPagination :meta="meta" @pagination-clicked="fetchMovies" />
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";
import MovieCard from "@/components/MovieCard.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  components: {
    MovieCard,
    MovieHeaderLinkList
  },
  data() {
    return {
      movies: [],
      meta: {}
    };
  },
  methods: {
    fetchMovies: function(page) {
      MOTService.getNowShowing(page)
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
