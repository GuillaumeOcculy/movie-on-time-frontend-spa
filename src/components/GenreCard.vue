<template>
  <div>
    <p>{{ genre.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    genre: Object
  }
};
</script>
