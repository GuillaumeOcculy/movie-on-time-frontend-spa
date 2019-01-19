<template>
  <div>
    <MovieHeaderLinkList />
    <MovieInfo :movie="movie" />
  </div>
</template>

<script>
import MovieService from "@/services/MovieService.js";
import MovieInfo from "@/components/MovieInfo.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  props: {
    id: Number
  },
  components: {
    MovieHeaderLinkList,

    MovieInfo
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
