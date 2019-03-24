<template>
  <div v-if="movie.attributes">
    <MovieHeaderLinkList />
    <MovieInfo :movie="movie" />

    <div class="row bg-white mt-3 d-flex bd-highlight">
      <template v-for="date in movie.attributes.dates">
        <div class="p-2 flex-fill bd-highlight text-center border" :key="date">
          <button @click="set_date(date)" class="btn">{{ date }}</button>
        </div>
      </template>
    </div>

    <div class="bg-white mt-3">
      <template>
        <form class="form-inline">
          <div class="form-group mx-sm-3 mb-2 mt-3">
            <label for="inputPassword2" class="sr-only">Password</label>
            <input
              type="text"
              class="form-control"
              placeholder="Search Cinema"
              v-model="query"
              v-on:keyup="search_cinemas"
            />
          </div>
          <div class="form-group mb-2 mt-3">
            <label for="staticEmail2" class="sr-only">Email</label>
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail2"
              :value="'Cinemas: ' + cinemas.length"
            />
          </div>
        </form>
      </template>

      <template v-if="cinemas.length > 0">
        <CinemaInfo
          v-for="cinema in cinemas"
          :key="cinema.id"
          :cinema="cinema"
        />
      </template>

      <template v-else>
        <div class="bt-white">
          <h1>There are no cinemas avaible at this moment</h1>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import MovieInfo from "@/components/MovieInfo.vue";
import CinemaInfo from "@/components/CinemaInfo.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";
import { mapState } from "vuex";

export default {
  props: {
    id: [String, Number]
  },
  components: {
    MovieHeaderLinkList,
    MovieInfo,
    CinemaInfo
  },
  data: function() {
    return {
      query: "",
      date: ""
    };
  },
  computed: {
    payload: function() {
      return {
        id: this.id,
        query: this.query,
        date: this.date
      };
    },
    cinemas: function() {
      return this.movie.cinemas;
    },
    ...mapState(["movie"])
  },
  methods: {
    set_date(date) {
      this.date = date;
      console.log("set_date", this.payload);
      this.$store.dispatch("fetchMovie", this.payload);
    },
    search_cinemas() {
      console.log("search_cinemas", this.payload);
      this.$store.dispatch("fetchMovie", this.payload);
    }
  },
  created() {
    console.log("created payload", this.payload);
    this.$store.dispatch("fetchMovie", this.payload);
  }
};
</script>
