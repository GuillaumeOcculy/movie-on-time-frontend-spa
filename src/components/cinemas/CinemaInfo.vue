<template>
  <div class="bg-white mt-3 py-3">
    <h1 class="text-center">{{ cinema.attributes.name }}</h1>

    <hr />

    <dl class="text-center">
      <dt>Address</dt>
      <dd>{{ cinema.attributes.street }}</dd>
      <dd>{{ cinema.attributes.post_code }}</dd>
      <dd>{{ cinema.attributes.city }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    cinema: Object
  }
};
</script>

<style scoped></style>
