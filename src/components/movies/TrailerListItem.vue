<template>
  <div class="col-sm-12 col-lg-6 mb-3">
    <div class="embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item" :src="trailerUrl"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trailer: {
      required: true,
      type: Object
    }
  },
  computed: {
    trailerUrl: function() {
      let originalUrl = this.trailer.attributes.url;
      let traileurUrl = originalUrl.replace("watch?v=", "embed/");
      return traileurUrl;
    }
  }
};
</script>
