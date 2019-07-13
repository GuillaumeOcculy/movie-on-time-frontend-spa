<template>
  <div v-if="cinema.attributes">
    <h1 class="text-center">{{ cinema.attributes.name }}</h1>

    <div class="bd-example bd-example-tabs">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="home-tab"
            data-toggle="tab"
            href="#home"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >Home</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="shotimes-tab"
            data-toggle="tab"
            href="#shotimes"
            role="tab"
            aria-controls="shotimes"
            aria-selected="false"
          >Showtimes</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
          <CinemaInfo :cinema="cinema" />

          <div class="row bg-white mt-3 d-flex bd-highlight">
            <template v-for="date in cinema.attributes.dates">
              <div
                class="p-2 flex-fill bd-highlight text-center border"
                :key="date"
                :class="{ 'alert-info': date == cinema.attributes.date }"
              >
                <button @click="set_date(date)" class="btn">
                  <AppShortDate :date="date" />
                </button>
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

            <MovieInfo v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
          </div>
        </div>
        <div class="tab-pane fade" id="shotimes" role="tabpanel" aria-labelledby="shotimes-tab">
          <div class="row bg-white mt-3 d-flex bd-highlight">
            <template v-for="date in cinema.attributes.dates">
              <div
                class="p-2 flex-fill bd-highlight text-center border"
                :key="date"
                :class="{ 'alert-info': date == cinema.attributes.date }"
              >
                <button @click="set_date(date)" class="btn">
                  <AppShortDate :date="date" />
                </button>
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

            <MovieInfo v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CinemaInfo from "@/components/cinemas/CinemaInfo.vue";
import MovieInfo from "@/components/cinemas/MovieInfo.vue";
import { mapState } from "vuex";

export default {
  props: {
    id: [String, Number]
  },
  components: {
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
