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
              :src="movie.attributes.poster_url || posterNotFound"
              :alt="movie.title"
            />
          </div>
          <div class="col-6">
            <h3 class="text-center">{{ movie.attributes.title }}</h3>
            <hr />

            <dl>
              <dt>Released on</dt>
              <dd>{{ movie.attributes.release_date }}</dd>
              <dt>Duration</dt>
              <dd>{{ movie.attributes.running_time }} min</dd>
              <dt>Directors</dt>
              <dd>{{ directorNames }}</dd>
              <dt>Casts</dt>
              <dd>{{ castNames }}</dd>
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
export default {
  props: {
    movie: Object
  },
  components: {
    ShowtimeList
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
