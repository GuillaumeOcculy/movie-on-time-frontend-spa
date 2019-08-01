<template>
  <footer class="bd-footer text-muted mt-3">
    <div class="container">
      <div class="d-flex justify-content-between">
        <div class="mt-3">
          <img :src="tmdbImage" alt="tmdb" height="50px" />
          <div>
            Icons made by
            <a
              href="https://www.flaticon.com/authors/pongsakornred"
              title="pongsakornRed"
              >pongsakornRed</a
            >,
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
              >Freepik</a
            >,
            <a
              href="https://www.flaticon.com/authors/smashicons"
              title="Smashicons"
              >Smashicons</a
            >
            from
            <a href="https://www.flaticon.com/" title="Flaticon"
              >www.flaticon.com</a
            >
            is licensed by
            <a
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              target="_blank"
              >CC 3.0 BY</a
            >
          </div>
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
