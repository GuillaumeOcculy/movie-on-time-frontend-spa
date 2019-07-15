<template>
  <div>
    <MovieHeaderLinkList />

    <CinemaList
      :cinemas="cinemas"
      :meta="meta"
      @query-entered="fetchCinemas"
      @pagination-clicked="fetchCinemas"
      @around-me-clicked="geolocateMe"
    />
  </div>
</template>

<script>
import axios from "axios";
import MOTService from "@/services/MOTService.js";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";
import CinemaList from "@/components/CinemaList.vue";

export default {
  components: {
    MovieHeaderLinkList,
    CinemaList
  },
  data() {
    return {
      cinemas: [],
      query: "",
      country: null,
      postal_code: null,
      mobile: null,
      latitude: null,
      longitude: null,
      meta: {}
    };
  },
  computed: {
    location: function() {
      return {
        country: this.country,
        postal_code: this.postal_code,
        mobile: this.mobile,
        latitude: this.latitude,
        longitude: this.longitude
      };
    }
  },
  methods: {
    geolocateMe() {
      let _this = this;
      if ("geolocation" in navigator) {
        // check if geolocation is supported/enabled on current browser
        navigator.geolocation.getCurrentPosition(
          function success(position) {
            // for when getting location is a success
            _this.latitude = position.coords.latitude;
            _this.longitude = position.coords.longitude;
            _this.fetchCinemas();
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
    fetchCinemas(payload) {
      let finalPayload = { ...payload, ...this.location };
      MOTService.getCinemas(finalPayload)
        .then(response => {
          this.cinemas = response.data["data"];
          this.meta = response.data["meta"];
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
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
      _this.fetchCinemas();
    });
  }
};
</script>

<style scoped></style>
