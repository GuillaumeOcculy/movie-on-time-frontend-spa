<template>
  <div>
    <CinemaListItem
      v-for="cinema in cinemas"
      :key="cinema.id"
      :cinema="cinema"
    />
  </div>
</template>

<script>
import CinemaListItem from "@/components/movies/CinemaListItem.vue";
export default {
  props: {
    cinemas: {
      required: true,
      type: Array
    }
  },
  components: {
    CinemaListItem
  }
};
</script>

<style scoped></style>
