<template>
  <div>
    <MovieHeaderLinkList />
    <MovieInfo
      :movie="movie"
      :trailers="trailers"
      :casts="casts"
      :directors="directors"
      :genres="genres"
    />

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
              :value="'Cinemas: ' + filteredCinemas.length"
            />
          </div>
        </form>
      </template>

      <CinemaInfo
        v-for="cinema in filteredCinemas"
        :key="cinema.id"
        :cinema="cinema"
      />
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
      search: ""
    };
  },
  computed: {
    filteredCinemas: function() {
      return this.cinemas.filter(cinema => {
        return cinema.attributes.name
          .toLowerCase()
          .match(this.search.toLowerCase());
      });
    },
    ...mapState([
      "movie",
      "trailers",
      "casts",
      "directors",
      "genres",
      "cinemas"
    ])
  },
  methods: {
    set_date(date) {
      var payload = { id: this.id, date: date };
      this.$store.dispatch("fetchMovie", payload);
    }
  },
  created() {
    this.$store.dispatch("fetchMovie", { id: this.id });
  }
};
</script>
