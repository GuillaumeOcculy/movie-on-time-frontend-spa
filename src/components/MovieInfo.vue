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
        <dd>{{ movie.attributes.release_date }}</dd>
        <dt>Genres</dt>
        <dd>{{ genreNames }}</dd>

        <template
          v-if="movie.attributes.title != movie.attributes.original_title"
        >
          <dt>Original title</dt>
          <dd>{{ movie.attributes.original_title }}</dd>
        </template>

        <dt>Duration</dt>
        <dd>{{ movie.attributes.running_time }} min</dd>
        <dt>Directors</dt>
        <dd>{{ directorNames }}</dd>
        <dt>Casts</dt>
        <dd>{{ castNames }}</dd>
        <dt>Synopsis</dt>
        <dd>{{ movie.attributes.synopsis }}</dd>
      </dl>

      <div class="text-center">
        <div class="btn-group" role="group" aria-label="Basic example">
          <TrailerLink
            v-for="(trailer, index) in trailers"
            :key="trailer.id"
            :trailer="trailer"
            :index="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrailerLink from "./TrailerLink.vue";

export default {
  props: {
    movie: Object,
    trailers: Array,
    genres: Array,
    directors: Array,
    casts: Array
  },
  components: {
    TrailerLink
  },
  computed: {
    genreNames: function() {
      var genres = this.genres.map(genre => genre.attributes.name);
      return genres.join(", ");
    },
    directorNames: function() {
      var directors = this.directors.map(director => director.attributes.name);
      return directors.join(", ");
    },
    castNames: function() {
      var casts = this.casts.map(cast => cast.attributes.name);
      return casts.join(", ");
    }
  }
};
</script>

<style scoped>
img {
  width: 400px;
}
</style>
