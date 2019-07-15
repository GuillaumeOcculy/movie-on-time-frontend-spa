<template>
  <div>
    <MovieHeaderLinkList />

    <CinemaList
      :cinemas="cinemas"
      :meta="meta"
      @query-entered="fetchCinemas"
      @pagination-clicked="fetchCinemas"
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
      meta: {}
    };
  },
  computed: {
    location: function() {
      return {
        country: this.country,
        postal_code: this.postal_code,
        mobile: this.mobile
      };
    }
  },
  methods: {
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
