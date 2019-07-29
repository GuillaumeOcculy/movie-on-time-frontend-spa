<template>
  <div>
    <MovieHeaderLinkList />

    <div class="d-flex justify-content-end">
      <AppPagination
        :meta="meta"
        @pagination-clicked="paginationClicked"
        v-if="movies.length > 0"
      />
    </div>

    <div class="d-flex justify-content-between">
      <p class="font-weight-bold">Movies: {{ movieCount || 0 }}</p>
      <AppSelectedCountry />
    </div>

    <div class="row" id="movies">
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
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  components: {
    MovieListItem,
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
      window.scrollTo({ top: "#movies", behavior: "smooth" });
    }
  },
  computed: {
    movieCount: function() {
      return this.meta.total_count;
    }
  }
};
</script>
