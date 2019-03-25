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
      const min = this.running_time % 60;

      return hour + "h" + min;
    }
  }
};
</script>
