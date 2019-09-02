<template>
  <div class="col-6 col-sm-3 mt-3">
    <router-link
      :to="{ name: 'movie-show', params: { id: movie.id } }"
      class="text-decoration-none"
    >
      <div class="card">
        <img
          :src="movie.attributes.thumbnail_url || posterNotFound"
          :alt="movie.attributes.title"
        />
        <div class="card-body">
          <h5 class="card-title">{{ movie.attributes.title }}</h5>
        </div>
        <div class="card-footer bg-transparent">
          <p class="text-center text-muted">
            <AppDate :date="movie.attributes.release_date" />
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import posterNotFound from "@/assets/images/poster_not_found.jpg";

export default {
  props: {
    movie: Object
  },
  data: function() {
    return {
      posterNotFound
    };
  }
};
</script>

<style scoped>
img {
  max-height: 428px;
  width: auto;
}

@media (max-width: 768px) {
  img {
    max-height: 200px;
    width: auto;
  }
}

.card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
</style>
