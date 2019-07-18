<template>
  <div class="row">
    <TrailerListItem
      v-for="trailer in trailers"
      :key="trailer.id"
      :trailer="trailer"
    />
  </div>
</template>

<script>
import TrailerListItem from "@/components/movies/TrailerListItem.vue";
export default {
  props: {
    trailers: {
      required: true,
      type: Array
    }
  },
  components: {
    TrailerListItem
  }
};
</script>

<style scoped></style>
