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

    <AppSelectedCountry />

    <div class="mt-2">
      <button
        type="button"
        class="btn btn-success"
        :disabled="disabledButton"
        @click.prevent="aroundMeClicked"
      >
        Find around me
      </button>
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
  data: function() {
    return { disabledButton: false };
  },
  components: {
    CinemaListItem,
    CinemaListForm
  },
  methods: {
    paginationClicked: function(payload) {
      this.$emit("pagination-clicked", payload);
    },
    aroundMeClicked: function() {
      this.disabledButton = true;
      this.$emit("around-me-clicked");
    },
    queryEntered: function(payload) {
      this.$emit("query-entered", payload);
    }
  }
};
</script>

<style scoped></style>
