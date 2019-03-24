<template>
  <span>{{ date | moment("ddd. MMMM Do") }}</span>
</template>

<script>
export default {
  props: {
    date: {
      required: true,
      type: Number
    }
  }
};
</script>
