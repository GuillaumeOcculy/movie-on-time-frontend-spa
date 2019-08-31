<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | Movie On Time",
    meta: [
      {
        name: "description",
        content:
          "Découvrez tous les films à l'affiche dans les cinémas ainsi que les horaires des séances. Réservez vos places. Savoir si le film contient une scène post-générique."
      }
    ]
  }
};
</script>

<style scoped>
.container {
  max-width: 1300px;
}
</style>
