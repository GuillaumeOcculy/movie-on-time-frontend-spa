<template>
  <span>{{ date | moment("ddd. MMM. Do") }}</span>
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
