<template>
  <div>
    <p>
      Country :
      <router-link :to="{ name: 'select-country' }" class="navbar-brand"
        >France</router-link
      >
    </p>
  </div>
</template>

<style scoped>
a {
  color: #007bff;
}
</style>
