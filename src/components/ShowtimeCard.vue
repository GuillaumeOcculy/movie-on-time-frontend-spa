<template>
  <router-link
    :to="{ name: 'showtime-show', params: { id: showtime.id } }"
    class="btn btn-danger mr-2"
    >{{ showtime.start_time }}</router-link
  >
</template>

<script>
export default {
  props: {
    showtime: Object
  }
};
</script>

<style scoped></style>
