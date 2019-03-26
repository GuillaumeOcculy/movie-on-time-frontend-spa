<template>
  <div class="row mt-2">
    <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        <input
          type="text"
          class="form-control"
          placeholder="Search movies"
          v-model="query"
          @input="queryEntered"
        >
      </div>

      <div class="form-group mb-2">
        <input
          type="text"
          readonly
          class="form-control-plaintext"
          id="staticEmail2"
          :value="'Movies: ' + movies.length"
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    movies: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    queryEntered: function() {
      const payload = { query: this.query };
      this.$emit("query-entered", payload);
    }
  }
};
</script>
