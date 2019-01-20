<template>
  <button class="btn btn-danger mr-2">{{ showtime.start_time }}</button>
</template>

<script>
export default {
  props: {
    showtime: Object
  }
};
</script>

<style scoped></style>
