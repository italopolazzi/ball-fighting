<template>
  <div class="players-register">
    <v-row>
      <v-col v-for="(player, player_key) in players" :key="player_key">
        <PlayerRegister :player_key="player_key" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerRegister from "@/components/Register/PlayerRegister";

export default {
  name: "players-register",
  components: { PlayerRegister },
  computed: {
    ...mapGetters("register/dual", { players: "getHumanPlayers" })
  }
};
</script>

<style>
</style>