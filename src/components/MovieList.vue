<template>
  <div>
    <MovieHeaderLinkList />

    <div class="d-flex justify-content-between">
      <MovieListForm @query-entered="queryEntered" :meta="meta" />

      <AppPagination
        :meta="meta"
        @pagination-clicked="paginationClicked"
        v-if="movies.length > 0"
      />
    </div>

    <div class="row">
      <MovieListItem v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>

    <div class="d-flex flex-row-reverse bd-highlight mt-3">
      <AppPagination
        :meta="meta"
        @pagination-clicked="paginationClicked"
        v-if="movies.length > 0"
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from "@/components/MovieListItem.vue";
import MovieListForm from "@/components/MovieListForm.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  components: {
    MovieListItem,
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
