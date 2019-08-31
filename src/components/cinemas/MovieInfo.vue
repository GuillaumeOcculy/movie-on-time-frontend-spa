<template>
  <div class="row p-3">
    <div class="col-sm-6">
      <router-link
        :to="{ name: 'movie-show', params: { id: movie.id } }"
        class="text-decoration-none"
      >
        <div class="row">
          <div class="col-6">
            <img
              :src="movie.attributes.thumbnail_url || posterNotFound"
              :alt="movie.title"
              class="img-fluid"
            />
          </div>
          <div class="col-6">
            <h3 class="text-center">
              {{ movie.attributes.title }}
              <span
                style="font-size: 1em; color: Tomato;"
                v-if="movie.attributes.watchlisted"
              >
                <i class="fas fa-bookmark"></i>
              </span>
            </h3>
            <hr />

            <dl>
              <template v-if="movie.attributes.release_date">
                <dt>Released on</dt>
                <dd><AppDate :date="movie.attributes.release_date" /></dd>
              </template>
              <template v-if="movie.attributes.running_time">
                <dt>Duration</dt>
                <dd>
                  <MovieHours :running_time="movie.attributes.running_time" />
                </dd>
              </template>
              <template v-if="directorNames.length > 0">
                <dt>Directors</dt>
                <dd>{{ directorNames }}</dd>
              </template>
              <template v-if="castNames.length > 0">
                <dt>Casts</dt>
                <dd>{{ castNames }}</dd>
              </template>
            </dl>
          </div>
        </div>
      </router-link>
    </div>
    <div class="col-sm-6 align-self-center">
      <ShowtimeList :showtimes="movie.attributes.showtimes.data" />
    </div>
  </div>
</template>

<script>
import posterNotFound from "@/assets/images/poster_not_found.jpg";
import ShowtimeList from "@/components/ShowtimeList.vue";
import MovieHours from "@/components/MovieHours.vue";

export default {
  props: {
    movie: Object
  },
  components: {
    ShowtimeList,
    MovieHours
  },
  data: function() {
    return {
      posterNotFound
    };
  },
  computed: {
    castNames: function() {
      var casts = this.movie.attributes.casts.data.map(
        cast => cast.attributes.name
      );
      return casts.join(", ");
    },
    directorNames: function() {
      var directors = this.movie.attributes.directors.data.map(
        director => director.attributes.name
      );
      return directors.join(", ");
    }
  }
};
</script>

<style scoped>
img {
  height: 300px;
}
</style>
