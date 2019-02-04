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
      <MovieDate
        v-for="date in movie.attributes.dates"
        :key="date"
        :date="date"
      />
    </div>

    <div class="bg-white mt-3">
      <CinemaInfo v-for="cinema in cinemas" :key="cinema.id" :cinema="cinema" />
    </div>
  </div>
</template>

<script>
import MovieInfo from "@/components/MovieInfo.vue";
import CinemaInfo from "@/components/CinemaInfo.vue";
import MovieDate from "@/components/MovieDate.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";
import { mapState } from "vuex";

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
  computed: mapState([
    "movie",
    "trailers",
    "casts",
    "directors",
    "genres",
    "cinemas"
  ]),
  created() {
    this.$store.dispatch("fetchMovie", this.id);
  }
};
</script>
