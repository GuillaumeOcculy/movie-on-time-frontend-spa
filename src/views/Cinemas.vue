<template>
  <div>
    <MovieHeaderLinkList />

    <CinemaList
      :cinemas="allCinemas"
      :meta="meta"
      @query-entered="fetchCinemas"
      @pagination-clicked="fetchCinemas"
      @around-me-clicked="geolocateMe"
    />
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";
import CinemaList from "@/components/CinemaList.vue";

export default {
  metaInfo: {
    title: "Cinemas"
  },
  components: {
    MovieHeaderLinkList,
    CinemaList
  },
  data() {
    return {
      cinemas: [],
      favoritedCinemas: [],
      query: "",
      latitude: null,
      longitude: null,
      meta: {}
    };
  },
  computed: {
    location: function() {
      return {
        latitude: this.latitude,
        longitude: this.longitude
      };
    },
    allCinemas: function() {
      let cinemas = this.favoritedCinemas.concat(this.cinemas);
      return cinemas;
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
          this.favoritedCinemas = response.data.data.filter(
            data => data.attributes.favorited == true
          );
          this.cinemas = response.data.data.filter(
            data => data.attributes.favorited == false
          );
          this.meta = response.data["meta"];
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    }
  },
  created() {
    this.fetchCinemas();
  }
};
</script>
