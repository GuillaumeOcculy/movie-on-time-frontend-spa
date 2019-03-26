<template>
  <div>
    <div v-for="(showtimes, group) in groupedShowtimes" :key="group">
      <div class="row mt-3">
        <div class="col-sm-2">{{ group }}</div>
        <div class="col-sm-10">
          <ShowtimeListItem
            v-for="showtime in showtimes"
            :key="showtime.id"
            :showtime="showtime"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import ShowtimeListItem from "@/components/ShowtimeListItem.vue";
export default {
  props: {
    showtimes: Array
  },
  components: {
    ShowtimeListItem
  },
  computed: {
    groupedShowtimes: function() {
      return _.groupBy(this.showtimes, "attributes.version");
    }
  }
};
</script>

<style scoped></style>
