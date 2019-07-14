<template>
  <div>
    <div class="row mt-3">
      <div class="col-md-10 offset-md-1">
        <div class="card">
          <div class="card-body">
            <div class="row" v-if="movie.attributes">
              <div class="col-sm-3">
                <router-link
                  :to="{ name: 'movie-show', params: { id: movie.id } }"
                >
                  <div class="text-center">
                    <img
                      :src="movie.attributes.poster_url"
                      alt="movie.attributes.title"
                      class="img-fluid"
                    />
                  </div>
                </router-link>
              </div>

              <div class="col-sm-5">
                <router-link
                  :to="{ name: 'movie-show', params: { id: movie.id } }"
                  class="text-decoration-none"
                >
                  <div>
                    <h1 class="text-center">{{ movie.attributes.title }}</h1>

                    <hr />

                    <dl class="row">
                      <template v-if="movie.attributes.running_time">
                        <dt class="col-sm-3">During</dt>
                        <dd class="col-sm-9">
                          <span class="text-muted">
                            <MovieHours
                              :running_time="movie.attributes.running_time"
                            />
                          </span>
                        </dd>
                      </template>

                      <template v-if="movie.attributes.release_date">
                        <dt class="col-sm-3">Released</dt>
                        <dd class="col-sm-9">
                          <span class="text-muted">
                            <AppDate :date="movie.attributes.release_date" />
                          </span>
                        </dd>
                      </template>

                      <template v-if="directorNames.length > 0">
                        <dt class="col-sm-3">By</dt>
                        <dd class="col-sm-9">
                          <span class="text-muted">{{ directorNames }}</span>
                        </dd>
                      </template>

                      <template v-if="castNames.length > 0">
                        <dt class="col-sm-3">With</dt>
                        <dd class="col-sm-9">
                          <span class="text-muted">{{ castNames }}</span>
                        </dd>
                      </template>
                    </dl>
                  </div>
                </router-link>
              </div>

              <div class="col-sm-4">
                <router-link
                  :to="{ name: 'cinema-show', params: { id: cinema.id } }"
                  class="text-decoration-none"
                >
                  <h2 class="text-center">{{ cinema.attributes.name }}</h2>
                </router-link>
                <hr />
                <p class="text-muted">Address</p>
                <p v-html="computedAddress"></p>

                <template v-if="cinema.attributes['ugc_unlimited?']">
                  <dd class="text-monospace text-info">
                    UGC unlimited card accepted
                  </dd>
                </template>
                <div class="text-center">
                  <a
                    :href="googleMapsUrl"
                    class="btn btn-outline-success"
                    target="_blank"
                    >Get directions</a
                  >
                </div>
              </div>
            </div>

            <hr />
            <div class="text-center" v-if="showtime.attributes">
              <div class="row">
                <div class="col-sm">
                  <p>Date</p>
                  <p class="text-danger">
                    <AppShortDate :date="showtime.attributes.start_date" />
                  </p>
                </div>
                <div class="col-sm">
                  <p>Begins</p>
                  <p class="text-danger">
                    {{ showtime.attributes.start_time }}
                  </p>
                </div>
                <div class="col-sm">
                  <p>Ends</p>
                  <p class="text-danger">{{ showtime.attributes.end_time }}</p>
                </div>
              </div>

              <div class="row">
                <div class="col-sm">
                  <p>Dimension</p>
                  <p class="text-danger">{{ showtime.attributes.dimension }}</p>
                </div>
                <div class="col-sm align-self-center">
                  <template v-if="showtime.attributes.booking_link">
                    <a
                      :href="showtime.attributes.booking_link"
                      class="btn btn-outline-success"
                      target="_blank"
                      >Book Online</a
                    >
                  </template>
                </div>
                <div class="col-sm">
                  <p>Version</p>
                  <p class="text-danger">{{ showtime.attributes.version }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";
import MovieHours from "@/components/MovieHours.vue";

export default {
  props: {
    id: [String, Number]
  },
  components: {
    MovieHours
  },
  data() {
    return {
      showtime: {},
      movie: {},
      cinema: {}
    };
  },
  created() {
    MOTService.getShowtime(this.id).then(response => {
      this.showtime = response.data["data"];
      this.movie = this.showtime.attributes.movie.data;
      this.cinema = this.showtime.attributes.cinema.data;
    });
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
    },
    computedAddress: function() {
      return [
        this.cinema.attributes.street,
        this.cinema.attributes.post_code,
        this.cinema.attributes.city
      ].join("<br>");
    },
    googleMapsUrl: function() {
      return (
        "https://www.google.com/maps/dir//" +
        this.cinema.attributes.latitude +
        "," +
        this.cinema.attributes.longitude
      );
    }
  }
};
</script>

<style scoped>
img {
  width: 200px;
}
</style>
