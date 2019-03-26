<template>
  <div class="col-sm-3 mt-3">
    <router-link
      :to="{ name: 'cinema-show', params: { id: cinema.id } }"
      class="text-decoration-none"
    >
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">{{ cinema.attributes.name }}</h5>
          <p class="card-text" v-html="computedAddress"></p>
        </div>
      </div>
    </router-link>
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

<style scoped>
.card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
</style>
