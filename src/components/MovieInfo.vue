<template>
  <div class="row bg-white mt-3 py-3 align-items-center">
    <div class="col-sm-4">
      <img :src="movie.poster_url" :alt="movie.title" />
    </div>
    <div class="col-sm-8">
      <h1 class="text-center">{{ movie.title }}</h1>

      <hr />

      <dl>
        <dt>Released on</dt>
        <dd>{{ movie.release_date }}</dd>
        <dt>Genres</dt>
        <dd>
          <GenreCard
            v-for="genre in movie.genres"
            :key="genre.id"
            :genre="genre"
          />
        </dd>

        <template v-if="movie.title != movie.original_title">
          <dt>Original title</dt>
          <dd>{{ movie.original_title }}</dd>
        </template>

        <dt>Duration</dt>
        <dd>{{ movie.running_time }} min</dd>
        <dt>Director</dt>
        <dd>{{ movie.directors }}</dd>
        <dt>Casts</dt>
        <dd>{{ movie.casts }}</dd>
        <dt>Synopsis</dt>
        <dd>{{ movie.synopsis }}</dd>
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
    </div>
  </div>
</template>

<script>
import TrailerLink from "./TrailerLink.vue";
import GenreCard from "./GenreCard.vue";

export default {
  props: {
    movie: Object
  },
  components: {
    GenreCard,
    TrailerLink
  }
};
</script>

<style scoped>
img {
  width: 400px;
}
</style>
