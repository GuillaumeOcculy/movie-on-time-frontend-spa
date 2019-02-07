<template>
  <div>
    <MovieHeaderLinkList />
    <CinemaInfo :cinema="cinema" />

    <div class="row bg-white mt-3 d-flex bd-highlight">
      <template v-for="date in cinema.attributes.dates">
        <div class="p-2 flex-fill bd-highlight text-center border" :key="date">
          <button @click="set_date(date)" class="btn">{{ date }}</button>
        </div>
      </template>
    </div>

    <MovieInfo v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script>
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";
import CinemaInfo from "@/components/cinemas/CinemaInfo.vue";
import MovieInfo from "@/components/cinemas/MovieInfo.vue";
import { mapState } from "vuex";

export default {
  props: {
    id: [String, Number]
  },
  components: {
    MovieHeaderLinkList,
    CinemaInfo,
    MovieInfo
  },
  created() {
    this.$store.dispatch("fetchCinema", { id: this.id });
  },
  computed: {
    ...mapState(["cinema", "movies"])
  },
  methods: {
    set_date(date) {
      var payload = { id: this.id, date: date };
      this.$store.dispatch("fetchCinema", payload);
    }
  }
};
</script>

<style scoped></style>
