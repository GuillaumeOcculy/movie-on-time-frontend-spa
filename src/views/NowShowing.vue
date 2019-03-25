<template>
  <div>
    <MovieHeaderLinkList />

    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="{ disabled: !meta.prev_page }">
          <a
            class="page-link"
            href="#"
            @click.prevent="previousPage"
            tabindex="-1"
            aria-disabled="true"
            >Previous</a
          >
        </li>

        <li class="page-item" :class="{ disabled: !meta.next_page }">
          <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
        </li>
      </ul>
    </nav>
    <div class="row">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";
import MovieCard from "@/components/MovieCard.vue";
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  components: {
    MovieCard,
    MovieHeaderLinkList
  },
  data() {
    return {
      movies: [],
      page: 1,
      meta: {}
    };
  },
  methods: {
    nextPage: function() {
      this.page++;
      this.getMovies();
    },
    previousPage: function() {
      if (this.page > 1) {
        this.page--;
        this.getMovies();
      }
    },
    getMovies: function() {
      MOTService.getNowShowing(this.page)
        .then(response => {
          this.movies = response.data["data"];
          this.meta = response.data["meta"];
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    }
  },
  created() {
    this.getMovies();
  }
};
</script>
