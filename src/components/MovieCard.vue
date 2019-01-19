<template>
  <div class="col-sm-3">
    <div class="card">
      <img :src="movie.poster_url" :alt="movie.title" />
      <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
      </div>
    </div>
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
</style>
