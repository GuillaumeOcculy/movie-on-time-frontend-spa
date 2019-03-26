<template>
  <div>
    <MovieHeaderLinkList />

    <div class="d-flex justify-content-between">
      <MovieListForm
        @query-entered="queryEntered"
        :movies="movies"
        :meta="meta"
      />

      <AppPagination
        :meta="meta"
        @pagination-clicked="paginationClicked"
        v-if="movies.length > 0"
      />
    </div>

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
import MovieListForm from "@/components/MovieListForm.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  components: {
    MovieCard,
    MovieListForm,
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
  methods: {
    paginationClicked: function(payload) {
      this.$emit("pagination-clicked", payload);
    },
    queryEntered: function(payload) {
      this.$emit("query-entered", payload);
    }
  }
};
</script>
