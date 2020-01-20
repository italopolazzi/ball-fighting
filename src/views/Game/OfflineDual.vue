<template>
  <div class="game-offline-dual">
    Game offline dual
    <GameStepper :components_sequence="components_sequence" />
  </div>
</template>

<script>
import GameStepper from "@/components/GameStepper";
import { mapGetters } from "vuex";

export default {
  name: "game-offline-dual",
  components: { GameStepper },
  computed: {
    ...mapGetters({ components_sequence: "game/offline_dual/getComponentsSequence" })
  }
};
</script>

<style>
</style>
