<template>
  <div class="player-register">
    Player key = {{player_key}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "player-register",
  props: {
    player_key: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
</style>