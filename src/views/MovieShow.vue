<template>
  <div v-if="movie.attributes">
    <h1 class="text-center">{{ movie.attributes.title }}</h1>
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
            >Home</a
          >
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
          >
            <img :src="movieTicket" /> Showtimes
          </a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            id="trailers-tab"
            data-toggle="tab"
            href="#trailers"
            role="tab"
            aria-controls="trailers"
            aria-selected="false"
          >
            <img :src="movieProjector" /> Trailers
          </a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade active show"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <MovieInfo :movie="movie" />
        </div>
        <div
          class="tab-pane fade"
          id="shotimes"
          role="tabpanel"
          aria-labelledby="shotimes-tab"
        >
          <div class="row bg-white mt-3 d-flex bd-highlight">
            <template v-for="date in movie.attributes.dates">
              <div
                class="p-2 flex-fill bd-highlight text-center border"
                :key="date"
                :class="{ 'alert-info': date == movie.attributes.date }"
              >
                <button @click="set_date(date)" class="btn">
                  <AppShortDate :date="date" />
                </button>
              </div>
            </template>
          </div>

          <div class="bg-white mt-3" id="cinema-list">
            <div class="d-flex justify-content-between p-3">
              <CinemaListForm @query-entered="fetch_movie" :meta="meta" />

              <AppPagination
                :meta="meta"
                @pagination-clicked="fetch_movie"
                v-if="cinemas_length > 0"
              />
            </div>

            <div class="pl-3 pr-3">
              <div class="d-flex justify-content-between">
                <button
                  type="button"
                  class="btn btn-success"
                  :disabled="disabledButton"
                  @click.prevent="geolocateMe"
                >
                  Find around me
                </button>

                <AppSelectedCountry />
              </div>
            </div>

            <template v-if="favorited_cinemas.length > 0">
              <CinemaList :cinemas="favorited_cinemas" />
            </template>

            <template v-if="cinemas.length > 0">
              <CinemaList :cinemas="cinemas" />
            </template>

            <template v-if="cinemas_length == 0">
              <div class="bt-white">
                <h1>There are no cinemas available at this moment</h1>
              </div>
            </template>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="trailers"
          role="tabpanel"
          aria-labelledby="trailers-tab"
        >
          <div class="mt-3"><TrailerList :trailers="movie.trailers" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieInfo from "@/components/MovieInfo.vue";
import TrailerList from "@/components/movies/TrailerList.vue";
import CinemaList from "@/components/movies/CinemaList.vue";
import CinemaListForm from "@/components/CinemaListForm.vue";
import { mapState } from "vuex";
import movieTicket from "@/assets/images/icons/movie-ticket.png";
import movieProjector from "@/assets/images/icons/movie-projector.png";

export default {
  props: {
    id: [String, Number]
  },
  components: {
    MovieInfo,
    CinemaList,
    CinemaListForm,
    TrailerList
  },
  data: function() {
    return {
      query: "",
      date: "",
      page: 1,
      latitude: null,
      longitude: null,
      disabledButton: false,
      movieTicket,
      movieProjector
    };
  },
  computed: {
    payload: function() {
      return {
        id: this.id,
        q: this.query,
        date: this.date,
        page: this.page,
        latitude: this.latitude,
        longitude: this.longitude
      };
    },
    cinemas: function() {
      return this.movie.cinemas;
    },
    favorited_cinemas: function() {
      return this.movie.favorited_cinemas;
    },
    cinemas_length: function() {
      return this.cinemas.length + this.favorited_cinemas.length;
    },
    ...mapState(["movie", "meta"])
  },
  methods: {
    geolocateMe() {
      let _this = this;
      this.disabledButton = true;
      if ("geolocation" in navigator) {
        // check if geolocation is supported/enabled on current browser
        navigator.geolocation.getCurrentPosition(
          function success(position) {
            // for when getting location is a success
            _this.latitude = position.coords.latitude;
            _this.longitude = position.coords.longitude;
            _this.fetch_movie();
          },
          function error(error_message) {
            // for when getting location results in an error
            console.error(
              "An error has occured while retrieving" + "location",
              error_message
            );
          }
        );
      } else {
        // geolocation is not supported
        // get your location some other way
        console.log("geolocation is not enabled on this browser");
      }
    },
    set_date(date) {
      this.date = date;
      this.fetch_movie();
    },
    fetch_movie(payload) {
      this.page = payload && payload["page"] ? payload["page"] : 1;
      if (payload && payload["q"]) {
        this.query = payload["q"];
      }
      this.$store.dispatch("fetchMovie", this.payload);
    }
  },
  created() {
    let _this = this;
    _this.fetch_movie();
  }
};
</script>

<style scoped>
#cinema-list {
  margin-right: -15px;
  margin-left: -15px;
}
</style>
