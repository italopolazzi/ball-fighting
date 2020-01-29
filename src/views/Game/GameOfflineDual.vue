<template>
  <div class="game-offline-dual">
    <div id="battle_container_id"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "game-offline-dual",
  methods: {
    ...mapActions("game/dual", ["prepareForBattle"])
  },
  data() {
    return {
      battle_container_id: "battle_container_id"
    };
  },
  mounted() {
    this.prepareForBattle(this.battle_container_id);
  }
};
</script>

<style>
</style>