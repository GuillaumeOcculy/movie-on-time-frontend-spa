<template>
  <div>
    <MovieHeaderLinkList />
    <div class="row">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
    axios
      .get("http://localhost:3000/movies")
      .then(response => {
        this.movies = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>
