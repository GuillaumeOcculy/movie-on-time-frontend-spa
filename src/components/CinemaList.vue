<template>
  <div>
    <div class="d-flex justify-content-between">
      <CinemaListForm @query-entered="queryEntered" :meta="meta" />

      <AppPagination
        :meta="meta"
        @pagination-clicked="paginationClicked"
        v-if="cinemas.length > 0"
      />
    </div>

    <div class="row">
      <CinemaListItem
        v-for="cinema in cinemas"
        :key="cinema.id"
        :cinema="cinema"
      />
    </div>
  </div>
</template>

<script>
import CinemaListItem from "@/components/CinemaListItem.vue";
import CinemaListForm from "@/components/CinemaListForm.vue";

export default {
  props: {
    meta: {
      required: true,
      type: Object
    },
    cinemas: {
      required: true,
      type: Array
    }
  },
  components: {
    CinemaListItem,
    CinemaListForm
  },
  methods: {
    paginationClicked: function(payload) {
      this.$emit("pagination-clicked", payload);
    },
    queryEntered: function(payload) {
      this.$emit("query-entered", payload);
    }
  }
};
</script>

<style scoped></style>
