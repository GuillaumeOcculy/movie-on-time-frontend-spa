<template>
  <div class="row bg-white mt-3 py-3 align-items-center">
    <div class="col-sm-4">
      <img :src="movie.attributes.poster_url" :alt="movie.attributes.title" />
    </div>
    <div class="col-sm-8">
      <h1 class="text-center">{{ movie.attributes.title }}</h1>

      <hr />

      <dl>
        <dt>Released on</dt>
        <dd><AppDate :date="movie.attributes.release_date" /></dd>
        <dt>Genres</dt>
        <dd>{{ genreNames }}</dd>

        <template
          v-if="movie.attributes.title != movie.attributes.original_title"
        >
          <dt>Original title</dt>
          <dd>{{ movie.attributes.original_title }}</dd>
        </template>

        <template v-if="movie.attributes.running_time">
          <dt>Duration</dt>
          <dd><MovieHours :running_time="movie.attributes.running_time" /></dd>
        </template>

        <template v-if="directorNames.length > 0">
          <dt>Directors</dt>
          <dd>{{ directorNames }}</dd>
        </template>

        <template v-if="castNames.length > 0">
          <dt>Casts</dt>
          <dd>{{ castNames }}</dd>
        </template>

        <template v-if="movie.attributes.synopsis">
          <dt>Synopsis</dt>
          <dd>{{ movie.attributes.synopsis }}</dd>
        </template>
      </dl>

      <div class="text-center">
        <div class="btn-group" role="group" aria-label="Basic example">
          <TrailerLink
            v-for="(trailer, index) in movie.trailers"
            :key="trailer.id"
            :trailer="trailer"
            :index="index"
          />
        </div>
      </div>

      <div class="text-center" v-if="!movie.attributes.watched">
        <button
          type="button"
          class="btn btn-success"
          v-if="movie.attributes.watchlisted"
          @click="removeToWatchlist()"
        >
          Remove to Watchlist
        </button>

        <button
          type="button"
          class="btn btn-outline-success"
          v-else
          @click="addToWatchlist()"
        >
          Add to Watchlist
        </button>
      </div>

      <div class="text-center mt-3">
        <button
          type="button"
          class="btn btn-primary"
          v-if="movie.attributes.watched"
          @click="removeAsWatched()"
        >
          Remove as Watched
        </button>

        <button
          type="button"
          class="btn btn-outline-primary"
          v-else
          @click="markAsWatched()"
        >
          Mark as Watched
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TrailerLink from "./TrailerLink.vue";
import MovieHours from "./MovieHours.vue";
import MOTService from "@/services/MOTService.js";

export default {
  props: {
    movie: Object,
    trailers: Array,
    genres: Array,
    directors: Array,
    casts: Array
  },
  components: {
    TrailerLink,
    MovieHours
  },
  computed: {
    genreNames: function() {
      var genres = this.movie.genres.map(genre => genre.attributes.name);
      return genres.join(", ");
    },
    directorNames: function() {
      var directors = this.movie.directors.map(
        director => director.attributes.name
      );
      return directors.join(", ");
    },
    castNames: function() {
      var casts = this.movie.casts.map(cast => cast.attributes.name);
      return casts.join(", ");
    },
    movieId: function() {
      return { movie_id: this.movie.id };
    }
  },
  methods: {
    addToWatchlist() {
      if (!localStorage.user) {
        alert("You must be logged in");
        return;
      }

      MOTService.addToWatchlist(this.movieId)
        .then(() => {
          this.movie.attributes.watchlisted = true;
        })
        .catch(error => {
          if (error.response.status == 401) alert("You must be logged in");
        });
    },
    removeToWatchlist() {
      MOTService.removeToWatchlist(this.movieId).then(() => {
        this.movie.attributes.watchlisted = false;
      });
    },
    markAsWatched() {
      if (!localStorage.user) {
        alert("You must be logged in");
        return;
      }

      MOTService.markAsWatched(this.movieId)
        .then(() => {
          this.movie.attributes.watched = true;
          this.movie.attributes.watchlisted = false;
        })
        .catch(error => {
          if (error.response.status == 401) alert("You must be logged in");
        });
    },
    removeAsWatched() {
      MOTService.removeAsWatched(this.movie.id).then(() => {
        this.movie.attributes.watched = false;
      });
    }
  }
};
</script>

<style scoped>
img {
  width: 400px;
}
</style>
