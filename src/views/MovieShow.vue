<template>
  <div>
    <MovieHeaderLinkList />
    <MovieInfo
      :movie="movie"
      :trailers="trailers"
      :casts="casts"
      :directors="directors"
      :genres="genres"
    />

    <div class="row bg-white mt-3 d-flex bd-highlight">
      <MovieDate v-for="date in this.dates" :key="date" :date="date" />
    </div>

    <div class="bg-white mt-3">
      <CinemaInfo v-for="cinema in cinemas" :key="cinema.id" :cinema="cinema" />
    </div>
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";
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
      movie: {},
      dates: [],
      trailers: [],
      casts: [],
      directors: [],
      genres: [],
      cinemas: []
    };
  },
  created() {
    MOTService.getMovie(this.id)
      .then(response => {
        this.movie = response.data.data;
        this.dates = this.movie.attributes.dates;
        this.trailers = response.data.included.filter(
          association => association.type == "trailer"
        );
        this.directors = response.data.included.filter(
          association => association.type == "director"
        );
        this.casts = response.data.included.filter(
          association => association.type == "cast"
        );
        this.genres = response.data.included.filter(
          association => association.type == "genre"
        );
        this.cinemas = response.data.included.filter(
          association => association.type == "cinema_item"
        );
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>
