<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !meta.prev_page }">
        <a
          class="page-link"
          href="#"
          @click.prevent="click(meta.prev_page)"
          tabindex="-1"
          aria-disabled="true"
        >Previous</a>
      </li>

      <li class="page-item" :class="{ disabled: !meta.next_page }">
        <a class="page-link" href="#" @click.prevent="click(meta.next_page)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    meta: {
      required: true,
      type: Object
    }
  },
  methods: {
    click: function(page) {
      const payload = { page: page };
      this.$emit("pagination-clicked", payload);
    }
  }
};
</script>
