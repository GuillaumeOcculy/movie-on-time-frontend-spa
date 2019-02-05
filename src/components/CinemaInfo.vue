<template>
  <div class="row p-3">
    <div class="col-sm-4">
      <h1 class="text-center">{{ cinema.attributes.name }}</h1>
      <p v-html="computedAddress"></p>
    </div>
    <div class="col-sm-8 align-self-center">
      <ShowtimeList :showtimes="cinema.attributes.showtimes.data" />
    </div>
  </div>
</template>

<script>
import ShowtimeList from "@/components/ShowtimeList.vue";
export default {
  props: {
    cinema: Object
  },
  components: {
    ShowtimeList
  },
  computed: {
    computedAddress: function() {
      return [
        this.cinema.attributes.street,
        this.cinema.attributes.post_code,
        this.cinema.attributes.city
      ].join("<br>");
    }
  }
};
</script>

<style scoped></style>
