<template>
  <div class="battle-offline-dual">
    <BattleRegister :components="components" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import PlayerRegister from "@/components/Game/BattleRegister/PlayerRegister";
import CharacterRegister from "@/components/Game/BattleRegister/CharacterRegister";
import MapRegister from "@/components/Game/BattleRegister/MapRegister";


import BattleRegister from "@/components/Game/BattleRegister";
export default {
  name: "battle-offline-dual",
  components: { BattleRegister },
  data() {
    return {
      components: [
        PlayerRegister,
        CharacterRegister,
        MapRegister,
      ]
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