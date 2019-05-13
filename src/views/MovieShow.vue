<template>
  <div v-if="movie.attributes">
    <MovieHeaderLinkList />
    <MovieInfo :movie="movie" />

    <div class="row bg-white mt-3 d-flex bd-highlight">
      <template v-for="date in movie.attributes.dates">
        <div class="p-2 flex-fill bd-highlight text-center border" :key="date">
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
</template>

<script>
import MovieInfo from "@/components/MovieInfo.vue";
import CinemaList from "@/components/movies/CinemaList.vue";
import CinemaListForm from "@/components/CinemaListForm.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";
import { mapState } from "vuex";

export default {
  props: {
    id: [String, Number]
  },
  components: {
    MovieHeaderLinkList,
    MovieInfo,
    CinemaList,
    CinemaListForm
  },
  data: function() {
    return {
      query: "",
      date: "",
      page: 1
    };
  },
  computed: {
    payload: function() {
      return {
        id: this.id,
        query: this.query,
        date: this.date,
        page: this.page
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
      this.query = payload && payload["query"] ? payload["query"] : "";
      this.$store.dispatch("fetchMovie", this.payload);
    }
  },
  created() {
    this.fetch_movie();
  }
};
</script>

<style scoped>
#cinema-list {
  margin-right: -15px;
  margin-left: -15px;
}
</style>
