<template>
  <span>{{ date | moment("MMMM Do YYYY") }}</span>
</template>

<script>
export default {
  props: {
    date: {
      required: true,
      type: String
    }
  }
};
</script>
