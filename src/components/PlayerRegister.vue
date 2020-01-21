<template>
  <div class="player-register">
    <v-card>
      <v-card-title>Player register</v-card-title>
      <v-card-text>
        <v-text-field type="text" placeholder="Nickname"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="validator">Finish</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "player-register",
  props: {
    validator: {
      type: Function,
      required: true
    }
  }
};
</script>

<style>
</style>