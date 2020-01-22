<template>
  <div class="battle-offline-dual">
    <template v-if="false">
      <BattleCamp />
    </template>
    <template v-else>
      <BattleRegister :components="components" />
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import PlayerRegister from "@/components/Game/BattleRegister/PlayerRegister";
import CharacterRegister from "@/components/Game/BattleRegister/CharacterRegister";
import MapRegister from "@/components/Game/BattleRegister/MapRegister";

import BattleCamp from "@/components/Game/BattleCamp";
import BattleRegister from "@/components/Game/BattleRegister";

export default {
  name: "battle-offline-dual",
  components: { BattleCamp, BattleRegister },
  data() {
    return {
      components: [PlayerRegister, CharacterRegister, MapRegister]
    };
  },
  methods: {
    ...mapActions("game/offline_dual", ["startRegister", "registerPlayer"])
  },
  created() {
    this.startRegister();
  }
};
</script>

<style>
</style>