<template>
  <div id="app">
    <Navbar />
    <div class="container"><router-view /></div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style scoped>
.container {
  max-width: 1300px;
}
</style>
