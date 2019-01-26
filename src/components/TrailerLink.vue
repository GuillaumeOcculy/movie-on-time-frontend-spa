<template>
  <div>
    <a
      :href="trailer.attributes.url"
      target="_blank"
      class="btn btn-outline-danger m-3"
      >Trailer #{{ index + 1 }}</a
    >
  </div>
</template>

<script>
export default {
  props: {
    trailer: Object,
    index: Number
  }
};
</script>
