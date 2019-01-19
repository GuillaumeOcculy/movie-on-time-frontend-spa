<template>
  <div>
    <MovieHeaderLinkList />
    <div class="row">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script>
import MovieService from "@/services/MovieService.js";
import MovieCard from "@/components/MovieCard.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  name: "home",
  components: {
    MovieCard,
    MovieHeaderLinkList
  },
  data() {
    return {
      movies: []
    };
  },
  created() {
    MovieService.getNowShowing()
      .then(response => {
        this.movies = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>
