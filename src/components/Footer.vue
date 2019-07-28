<template>
  <footer class="bd-footer text-muted mt-3 bg-white">
    <div class="container">
      <div class="d-flex justify-content-between">
        <div class="mt-3">
          <img :src="tmdbImage" alt="tmdb" height="80px" />
        </div>
        <div>
          <ul style="list-style: none;">
            <li>
              <a href="mailto:contact@movieontime.com" target="_top">Contact</a>
            </li>
            <li>
              <router-link :to="{ name: 'terms-of-use' }"
                >Terms of Use</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'privacy-policy' }"
                >Privacy Policy</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <p class="text-muted text-center">
        © Copyright Movie On Time {{ new Date().getFullYear() }}. All Rights
        Reserved.
      </p>
    </div>
  </footer>
</template>

<script>
import tmdbImage from "@/assets/images/powered-by-rectangle-green.svg";
export default {
  data() {
    return {
      tmdbImage
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 1300px;
}
</style>
