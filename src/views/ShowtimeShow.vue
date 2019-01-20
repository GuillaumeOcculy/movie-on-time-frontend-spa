<template>
  <div>
    <MovieHeaderLinkList />
    <div class="row mt-3">
      <div class="col-md-10 offset-md-1">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-4">
                <img :src="movie.poster_url" alt="movie.title" />
              </div>

              <div class="col-sm-4">
                <router-link
                  :to="{ name: 'movie-show', params: { id: movie.id } }"
                >
                  <h1>{{ movie.title }}</h1>
                </router-link>
                <hr />
                <p>
                  <span class="text-muted">During</span>
                  {{ movie.running_time }} min
                </p>
                <p>
                  <span class="text-muted">Released on</span>
                  {{ movie.release_date }}
                </p>
                <p><span class="text-muted">By</span> {{ movie.directors }}</p>
                <p><span class="text-muted">With</span> {{ movie.casts }}</p>
              </div>

              <div class="col-sm-4">
                <h2>{{ cinema.name }}</h2>
                <hr />
                <p class="text-muted">Address</p>
                <p>{{ cinema.address }}</p>
              </div>
            </div>

            <hr />
            <div class="text-center">
              <div class="row">
                <div class="col-sm">
                  <p>Date</p>
                  <p class="text-danger">{{ showtime.start_date }}</p>
                </div>
                <div class="col-sm">
                  <p>Begins</p>
                  <p class="text-danger">{{ showtime.start_time }}</p>
                </div>
                <div class="col-sm">
                  <p>Ends</p>
                  <p class="text-danger">{{ showtime.end_time }}</p>
                </div>
              </div>

              <div class="row">
                <div class="col-sm">
                  <p>Dimension</p>
                  <p class="text-danger">{{ showtime.dimension }}</p>
                </div>
                <div class="col-sm align-self-center">
                  <template v-if="showtime.booking_link">
                    <a
                      :href="showtime.booking_link"
                      class="btn btn-outline-success"
                      target="_blank"
                      >Book Online</a
                    >
                  </template>
                </div>
                <div class="col-sm">
                  <p>Version</p>
                  <p class="text-danger">{{ showtime.version }}</p>
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
      this.showtime = response.data["showtime"];
      this.movie = this.showtime.movie;
      this.cinema = this.showtime.cinema;
    });
  }
};
</script>

<style scoped>
img {
  width: 200px;
}
</style>
