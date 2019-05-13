<template>
  <div class="bg-white mt-3 py-3">
    <h1 class="text-center">{{ cinema.attributes.name }}</h1>

    <hr>

    <dl class="text-center">
      <dt>Address</dt>
      <dd>{{ cinema.attributes.street }}</dd>
      <dd>{{ cinema.attributes.post_code }}</dd>
      <dd>{{ cinema.attributes.city }}</dd>

      <dd>
        <button
          type="button"
          class="btn btn-success"
          v-if="cinema.attributes.favorited"
          @click="removeToFavorite()"
        >Remove to Favorite</button>
        <button
          type="button"
          class="btn btn-outline-success"
          v-else
          @click="addToFavorite()"
        >Add to Favorite</button>
      </dd>
    </dl>
  </div>
</template>

<script>
import MOTService from "@/services/MOTService.js";

export default {
  props: {
    cinema: Object
  },
  computed: {
    cinemaId: function() {
      return { cinema_id: this.cinema.id };
    }
  },
  methods: {
    addToFavorite() {
      MOTService.addToFavorite(this.cinemaId).then(() => {
        this.cinema.attributes.favorited = true;
      });
    },
    removeToFavorite() {
      MOTService.removeToFavorite(this.cinemaId).then(() => {
        this.cinema.attributes.favorited = false;
      });
    }
  }
};
</script>

<style scoped></style>
