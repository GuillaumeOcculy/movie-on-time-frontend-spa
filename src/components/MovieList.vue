<template>
  <div>
    <MovieHeaderLinkList />

    <div class="row mt-2" v-if="movies.length > 0">
      <form class="form-inline">
        <div class="form-group mx-sm-3 mb-2">
          <label for="inputPassword2" class="sr-only">Password</label>
          <input
            type="text"
            class="form-control"
            placeholder="Search movies"
            v-model="query"
            @input="queryEntered"
          />
        </div>
        <div class="form-group mb-2">
          <label for="staticEmail2" class="sr-only">Email</label>
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            id="staticEmail2"
            :value="'Movies: ' + movies.length"
          />
        </div>
      </form>
    </div>

    <AppPagination
      :meta="meta"
      @pagination-clicked="paginationClicked"
      v-if="movies.length > 0"
    />

    <div class="row">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>

    <AppPagination
      :meta="meta"
      @pagination-clicked="paginationClicked"
      v-if="movies.length > 0"
    />
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  components: {
    MovieCard,
    MovieHeaderLinkList
  },
  props: {
    meta: {
      required: true,
      type: Object
    },
    movies: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    paginationClicked: function(payload) {
      this.$emit("pagination-clicked", payload);
    },
    queryEntered: function() {
      const payload = { query: this.query };
      this.$emit("query-entered", payload);
    }
  }
};
</script>
