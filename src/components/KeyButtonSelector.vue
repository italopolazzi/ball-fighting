<template>
  <div class="key-button-selector d-flex flex-column align-center">
    <v-btn x-large outlined icon :disabled="!keys[direction]" @click="method(direction)">
      <v-icon>{{icon}}</v-icon>
    </v-btn>

    <v-chip
      class="mt-2"
      small
      :color="keys[direction] ? changing_message_color : 'error'"
    >{{keys[direction] ? keys[direction] : ''}}</v-chip>
  </div>
</template>

<script>
export default {
  name: "key-button-selector",
  props: [
    "icon",
    "direction",
    "method",
    "keys",
    "changing_message",
    "changing_message_color"
  ]
};
</script>

<style>
</style>