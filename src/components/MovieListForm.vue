<template>
  <div>
    <form class="form-inline">
      <div class="form-group mr-2">
        <input
          type="text"
          class="form-control"
          placeholder="Filter movies"
          v-model="query"
          @input="queryEntered"
        />
      </div>
      <div class="form-group mb-2">
        <input
          type="text"
          readonly
          class="form-control-plaintext"
          id="staticEmail2"
          :value="'Movies: ' + this.movieCount"
        />
      </div>
    </form>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    meta: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      query: ""
    };
  },
  computed: {
    movieCount: function() {
      if (this.meta.total_count) {
        return this.meta.total_count;
      }
      return 0;
    }
  },
  methods: {
    queryEntered: _.debounce(function() {
      const payload = { q: this.query };
      this.$emit("query-entered", payload);
    }, 600)
  }
};
</script>
