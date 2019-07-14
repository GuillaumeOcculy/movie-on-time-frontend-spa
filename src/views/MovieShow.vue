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
            >Showtimes</a
          >
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

            <AppSelectedCountry class="p-3" />

            <template v-if="favorited_cinemas.length > 0">
              <CinemaList :cinemas="favorited_cinemas" />
            </template>

            <template v-if="cinemas.length > 0">
              <CinemaList :cinemas="cinemas" />
            </template>

            <template v-if="cinemas_length == 0">
              <div class="bt-white">
                <h1>There are no cinemas avaible at this moment</h1>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieInfo from "@/components/MovieInfo.vue";
import CinemaList from "@/components/movies/CinemaList.vue";
import CinemaListForm from "@/components/CinemaListForm.vue";
import { mapState } from "vuex";

export default {
  props: {
    id: [String, Number]
  },
  components: {
    MovieInfo,
    CinemaList,
    CinemaListForm
  },
  data: function() {
    return {
      query: "",
      date: "",
      page: 1,
      country: null,
      postal_code: null,
      mobile: null
    };
  },
  computed: {
    payload: function() {
      return {
        id: this.id,
        q: this.query,
        date: this.date,
        page: this.page,
        country: this.country,
        postal_code: this.postal_code,
        mobile: this.mobile
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
    set_date(date) {
      this.date = date;
      this.fetch_movie();
    },
    fetch_movie(payload) {
      this.page = payload && payload["page"] ? payload["page"] : 1;
      this.query = payload && payload["q"] ? payload["q"] : "";
      this.$store.dispatch("fetchMovie", this.payload);
    },
    ipLookUp() {
      let response = axios
        .get("http://ip-api.com/json/?fields=country,zip,mobile")
        .then(
          response => {
            this.country = response.data.country;
            this.postal_code = response.data.zip;
            this.mobile = response.data.mobile;
          },

          function fail(data, status) {
            console.log("Request failed.  Returned status of", status);
          }
        );
      return response;
    }
  },
  created() {
    let _this = this;
    this.ipLookUp().then(function() {
      _this.fetch_movie();
    });
  }
};
</script>

<style scoped>
#cinema-list {
  margin-right: -15px;
  margin-left: -15px;
}
</style>
