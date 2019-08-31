<template>
  <div class="bg-white mt-3 py-3">
    <dl class="text-center">
      <dt>Address</dt>
      <dd>{{ cinema.attributes.street }}</dd>
      <dd>{{ cinema.attributes.post_code }}</dd>
      <dd>{{ cinema.attributes.city }}</dd>

      <AppGetDirection :cinema="cinema" class="mb-3" />

      <template v-if="cinema.attributes['ugc_unlimited?']">
        <dd class="text-monospace text-info mt-3">UGC card accepted</dd>
      </template>

      <dd>
        <button
          type="button"
          class="btn btn-success"
          v-if="cinema.attributes.favorited"
          @click="removeToFavorite()"
        >
          Remove to Favorite
        </button>
        <button
          type="button"
          class="btn btn-outline-success"
          v-else
          @click="addToFavorite()"
        >
          Add to Favorite
        </button>
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
      if (!localStorage.user) {
        alert("You must be logged in");
        return;
      }
      MOTService.addToFavorite(this.cinemaId)
        .then(() => {
          this.cinema.attributes.favorited = true;
        })
        .catch(error => {
          if (error.response.status == 401) alert("You must be logged in");
        });
    },
    removeToFavorite() {
      MOTService.removeToFavorite(this.cinema.id).then(() => {
        this.cinema.attributes.favorited = false;
      });
    }
  }
};
</script>

<style scoped></style>
