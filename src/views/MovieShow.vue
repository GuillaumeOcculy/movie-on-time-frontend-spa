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
      <template v-for="date in movie.attributes.dates">
        <div class="p-2 flex-fill bd-highlight text-center border" :key="date">
          <button @click="set_date(date)" class="btn">{{ date }}</button>
        </div>
      </template>
    </div>

    <div class="bg-white mt-3">
      <CinemaInfo v-for="cinema in cinemas" :key="cinema.id" :cinema="cinema" />
    </div>
  </div>
</template>

<script>
import MovieInfo from "@/components/MovieInfo.vue";
import CinemaInfo from "@/components/CinemaInfo.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";
import { mapState } from "vuex";

export default {
  props: {
    id: [String, Number]
  },
  components: {
    MovieHeaderLinkList,
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
  methods: {
    set_date(date) {
      var payload = { id: this.id, date: date };
      this.$store.dispatch("fetchMovie", payload);
    }
  },
  created() {
    this.$store.dispatch("fetchMovie", { id: this.id });
  }
};
</script>
