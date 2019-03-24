<template>
  <div>
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
      <template v-if="cinemas.length > 0">
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

      <CinemaInfo v-for="cinema in cinemas" :key="cinema.id" :cinema="cinema" />
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
      query: ""
    };
  },
  computed: {
    cinemas: function() {
      return this.movie.cinemas;
    },
    ...mapState(["movie"])
  },
  methods: {
    set_date(date) {
      var payload = { id: this.id, date: date };
      this.$store.dispatch("fetchMovie", payload);
    },
    search_cinemas() {
      var payload = { id: this.id, query: this.query };
      this.$store.dispatch("fetchMovie", payload);
    }
  },
  created() {
    this.$store.dispatch("fetchMovie", { id: this.id });
  }
};
</script>
