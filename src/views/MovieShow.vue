<template>
  <div>
    <MovieHeaderLinkList />
    <MovieInfo :movie="movie" />

    <div class="row bg-white mt-3 d-flex bd-highlight">
      <MovieDate v-for="date in movie.dates" :key="date" :date="date" />
    </div>

    <div class="bg-white mt-3">
      <CinemaInfo
        v-for="cinema in movie.cinemas"
        :key="cinema.id"
        :cinema="cinema"
      />
    </div>
  </div>
</template>

<script>
import MovieService from "@/services/MovieService.js";
import MovieInfo from "@/components/MovieInfo.vue";
import CinemaInfo from "@/components/CinemaInfo.vue";
import MovieDate from "@/components/MovieDate.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  props: {
    id: [String, Number]
  },
  components: {
    MovieHeaderLinkList,
    MovieDate,
    MovieInfo,
    CinemaInfo
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
