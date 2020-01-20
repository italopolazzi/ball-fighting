<template>
  <div class="game-offline-single">
    <GameStepper :components_sequence="components_sequence" />
  </div>
</template>

<script>
import GameStepper from "@/components/GameStepper";
import { mapGetters } from "vuex";

export default {
  name: "game-offline-single",
  components: { GameStepper },
  computed: {
    ...mapGetters({ components_sequence: "game/offline_single/getComponentsSequence" })
  }
};
</script>

<style>
</style>
