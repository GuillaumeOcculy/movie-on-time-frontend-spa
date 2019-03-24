<template>
  <div v-if="cinema.attributes">
    <MovieHeaderLinkList />
    <CinemaInfo :cinema="cinema" />

    <div class="row bg-white mt-3 d-flex bd-highlight">
      <template v-for="date in cinema.attributes.dates">
        <div class="p-2 flex-fill bd-highlight text-center border" :key="date">
          <button @click="set_date(date)" class="btn">{{ date }}</button>
        </div>
      </template>
    </div>

    <div class="bg-white mt-3">
      <template v-if="movies.length > 0">
        <form class="form-inline">
          <div class="form-group mx-sm-3 mb-2 mt-3">
            <label for="inputPassword2" class="sr-only">Password</label>
            <input
              type="text"
              class="form-control"
              placeholder="Search Movie"
              v-model="search"
            />
          </div>
          <div class="form-group mb-2 mt-3">
            <label for="staticEmail2" class="sr-only">Email</label>
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail2"
              :value="'Movies: ' + filteredMovies.length"
            />
          </div>
        </form>
      </template>

      <MovieInfo
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
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
  data: function() {
    return {
      search: "",
      date: ""
    };
  },
  created() {
    this.$store.dispatch("fetchCinema", { id: this.id });
  },
  computed: {
    filteredMovies: function() {
      return this.movies.filter(movie => {
        return movie.attributes.title
          .toLowerCase()
          .match(this.search.toLowerCase());
      });
    },
    movies: function() {
      return this.cinema.movies;
    },
    payload: function() {
      return { id: this.id, date: this.date };
    },
    ...mapState(["cinema"])
  },
  methods: {
    fetch_cinema() {
      this.$store.dispatch("fetchCinema", this.payload);
    },
    set_date(date) {
      this.date = date;
      this.fetch_cinema();
    }
  }
};
</script>

<style scoped></style>
