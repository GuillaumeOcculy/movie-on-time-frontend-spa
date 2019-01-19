<template>
  <div class="col-sm-3 mt-5">
    <router-link
      :to="{ name: 'movie-show', params: { id: movie.id } }"
      class="text-decoration-none"
    >
      <div class="card">
        <img :src="movie.poster_url" :alt="movie.title" />
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
        </div>
        <div class="card-footer bg-transparent">
          <p class="text-center text-muted">{{ movie.release_date }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  }
};
</script>

<style scoped>
img {
  height: 428px;
}

.card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
</style>
