<template>
  <div class="battle-offline-single">
    <template v-if="true">
      <BattleCamp />
    </template>
    <template v-else>
      <BattleRegister :components="components" />
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import CharacterRegister from "@/components/Game/BattleRegister/CharacterRegister";
import LevelRegister from "@/components/Game/BattleRegister/LevelRegister";
import MapRegister from "@/components/Game/BattleRegister/MapRegister";
import PlayerRegister from "@/components/Game/BattleRegister/PlayerRegister";

import BattleCamp from "@/components/Game/BattleCamp";
import BattleRegister from "@/components/Game/BattleRegister";

export default {
  name: "battle-offline-single",
  components: { BattleCamp, BattleRegister },
  data() {
    return {
      components: [
        CharacterRegister,
        LevelRegister,
        MapRegister,
        PlayerRegister
      ]
    };
  },
  methods: {
    ...mapActions("game/offline_single", ["startRegister", "registerPlayer"])
  },
  created() {
    this.startRegister();
  }
};
</script>

<style>
</style>