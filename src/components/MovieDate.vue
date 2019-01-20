<template>
  <div class="p-2 flex-fill bd-highlight text-center border">
    <span>{{ date }}</span>
  </div>
</template>

<script>
export default {
  props: {
    date: String,
    index: Number
  }
};
</script>
