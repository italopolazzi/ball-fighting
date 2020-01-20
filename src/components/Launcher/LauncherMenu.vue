<template>
  <div class="launcher-menu">
    <v-slide-x-transition mode="out-in">
      <v-btn icon to="/" v-if="$route.path !== '/'">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-slide-x-transition>
    <v-btn text to="launcher-play">Play</v-btn>
    <v-btn text to="launcher-about">About</v-btn>
    <v-btn text to="launcher-options">Options</v-btn>
  </div>
</template>

<script>
export default {
  name: "launcher-menu"
};
</script>

<style>
</style>