<template>
  <div class="main-menu">
    <v-slide-x-transition mode="out-in">
      <v-btn icon to="/" v-if="$route.path !== '/'">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-slide-x-transition>
    <v-btn text :to="{name: 'launcher-register'}">Play</v-btn>
    <v-btn disabled text :to="{name: 'launcher-options'}">Options</v-btn>
  </div>
</template>

<script>
export default {
  name: "main-menu"
};
</script>

<style>
</style>