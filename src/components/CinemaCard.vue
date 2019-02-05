<template>
  <div class="col-sm-3 mt-3">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{{ cinema.attributes.name }}</h5>
        <p class="card-text" v-html="computedAddress"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cinema: Object
  },
  computed: {
    computedAddress: function() {
      return [
        this.cinema.attributes.street,
        this.cinema.attributes.post_code,
        this.cinema.attributes.city
      ].join("<br>");
    }
  }
};
</script>

<style scoped></style>
