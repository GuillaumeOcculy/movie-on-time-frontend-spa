<template>
  <div>
    <MovieHeaderLinkList />
    <h1 class="text-center">{{ movie.title }}</h1>
  </div>
</template>

<script>
import MovieService from "@/services/MovieService.js";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  props: {
    id: Number
  },
  components: {
    MovieHeaderLinkList
  },
  data() {
    return {
      movie: {}
    };
  },
  created() {
    MovieService.getMovie(this.id)
      .then(response => {
        this.movie = response.data["movie"];
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>

<style scoped></style>
