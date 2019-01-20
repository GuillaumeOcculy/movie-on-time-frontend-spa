<template>
  <div>
    <MovieHeaderLinkList />
    <MovieInfo :movie="movie" />

    <div class="row bg-white mt-3 d-flex bd-highlight">
      <MovieDate v-for="date in movie.dates" :key="date" :date="date" />
    </div>
  </div>
</template>

<script>
import MovieService from "@/services/MovieService.js";
import MovieInfo from "@/components/MovieInfo.vue";
import MovieDate from "@/components/MovieDate.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  props: {
    id: [String, Number]
  },
  components: {
    MovieHeaderLinkList,
    MovieDate,
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
