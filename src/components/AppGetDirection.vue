<template>
  <a :href="googleMapsUrl" class="btn btn-outline-success" target="_blank"
    >Get directions</a
  >
</template>

<script>
export default {
  props: {
    cinema: {
      required: true,
      type: Object
    }
  },
  computed: {
    googleMapsUrl: function() {
      return (
        "https://www.google.com/maps/dir//" +
        this.cinema.attributes.latitude +
        "," +
        this.cinema.attributes.longitude
      );
    }
  }
};
</script>
