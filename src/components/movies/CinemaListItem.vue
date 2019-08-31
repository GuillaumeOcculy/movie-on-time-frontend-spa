<template>
  <div class="row p-3">
    <div class="col-sm-4">
      <router-link
        :to="{ name: 'cinema-show', params: { id: cinema.id } }"
        class="text-decoration-none"
      >
        <h2 class="text-center">
          {{ cinema.attributes.name }}
          <img v-if="favorited" :src="favoriteActive" height="25px" />
        </h2>
      </router-link>

      <p class="text-center" v-html="computedAddress"></p>

      <template v-if="cinema.attributes['ugc_unlimited?']">
        <dd class="text-monospace text-info text-center">UGC card accepted</dd>
      </template>
    </div>
    <div class="col-sm-8 align-self-center">
      <ShowtimeList :showtimes="cinema.attributes.showtimes.data" />
    </div>
  </div>
</template>

<script>
import ShowtimeList from "@/components/ShowtimeList.vue";
import favoriteActive from "@/assets/images/icons/favorite-active.svg";

export default {
  props: {
    cinema: Object
  },
  components: {
    ShowtimeList
  },
  data() {
    return {
      favoriteActive
    };
  },
  computed: {
    computedAddress: function() {
      return [
        this.cinema.attributes.street,
        this.cinema.attributes.post_code,
        this.cinema.attributes.city
      ].join("<br>");
    },
    favorited: function() {
      return this.cinema.attributes.favorited;
    }
  }
};
</script>

<style scoped></style>
