<template>
  <form class="form-inline">
    <div class="form-group mr-2">
      <input
        type="text"
        class="form-control"
        placeholder="Search cinema"
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
        :value="'Cinemas: ' + meta.total_count"
      />
    </div>
  </form>
</template>

<script>
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
  methods: {
    queryEntered: function() {
      const payload = { query: this.query };
      this.$emit("query-entered", payload);
    }
  }
};
</script>
