<template>
  <div class="mt-3">
    <router-link to="/" class="navbar-brand">Now Showing</router-link>
    <router-link :to="{ name: 'premiere' }" class="navbar-brand"
      >Premiere</router-link
    >
    <router-link :to="{ name: 'upcoming' }" class="navbar-brand"
      >Upcoming</router-link
    >
    <router-link :to="{ name: 'reprojection' }" class="navbar-brand"
      >Reprojection</router-link
    >
  </div>
</template>
