<template>
  <span>{{ hours }}</span>
</template>

<script>
export default {
  props: {
    running_time: {
      required: true,
      type: Number
    }
  },

  computed: {
    hours: function() {
      const hour = Math.floor(this.running_time / 60);
      let min = this.running_time % 60;
      if (min.toString().length == 1) {
        min = "0" + min;
      }

      return hour + "h" + min;
    }
  }
};
</script>
