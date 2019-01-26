<template>
  <div>
    <MovieHeaderLinkList />
    <div class="row mt-3">
      <div class="col-md-10 offset-md-1">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <img
                  :src="movie.attributes.poster_url"
                  alt="movie.attributes.title"
                />
              </div>

              <div class="col-sm-5">
                <router-link
                  :to="{ name: 'movie-show', params: { id: movie.id } }"
                >
                  <h1 class="text-center">{{ movie.attributes.title }}</h1>
                </router-link>
                <hr />
                <p>
                  <span class="text-muted">During</span>
                  {{ movie.attributes.running_time }} min
                </p>
                <p>
                  <span class="text-muted">Released on</span>
                  {{ movie.attributes.release_date }}
                </p>
                <p><span class="text-muted">By</span> {{ directorNames }}</p>
                <p><span class="text-muted">With</span> {{ castNames }}</p>
              </div>

              <div class="col-sm-4">
                <h2 class="text-center">{{ cinema.attributes.name }}</h2>
                <hr />
                <p class="text-muted">Address</p>
                <p v-html="computedAddress"></p>

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
            <div class="text-center">
              <div class="row">
                <div class="col-sm">
                  <p>Date</p>
                  <p class="text-danger">
                    {{ showtime.attributes.start_date }}
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
import MovieHeaderLinkList from "@/components/MovieHeaderLinkList.vue";

export default {
  props: {
    id: [String, Number]
  },
  components: {
    MovieHeaderLinkList
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
