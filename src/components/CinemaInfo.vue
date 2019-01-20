<template>
  <div class="row p-3">
    <div class="col-sm-4">
      <h1 class="text-center">{{ cinema.name }}</h1>
      <p v-html="computedAddress"></p>
    </div>
    <div class="col-sm-8 align-self-center">
      <ShowtimeList :showtimes="cinema.showtimes" />
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
      return this.cinema.address.split(",").join("<br>");
    }
  }
};
</script>

<style scoped></style>
