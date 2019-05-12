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
      meta: {}
    };
  },
  methods: {
    fetchCinemas(payload) {
      MOTService.getFavoriteCinemas(payload)
        .then(response => {
          this.cinemas = response.data["data"];
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

<style scoped></style>
