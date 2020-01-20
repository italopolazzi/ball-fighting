<template>
  <div class="player-register">
    <v-container fluid>
      <v-layout row fill-height>
        <v-flex xs6 v-for="index in Array(total_players).keys()" :key="index">
          <PlayerInputs :index="index" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerInputs from "@/components/Game/OfflineDual/PlayerInputs";
export default {
  name: "player-register",
  components: { PlayerInputs },
  data() {
    return {
      rules: [
        () =>
          Object.keys(this.players).length === this.total_players ||
          "Defina as informações dos 2 jogadores"
        //  false ||
        //   "Defina as informações dos 2 jogadores"
      ]
    };
  },
  created() {
    console.log(this.$store);
  },
  computed: {
    ...mapGetters({
      total_players: "game/offline_dual/getTotalPlayers",
      players: "game/offline_dual/players/getPlayers"
    })
  }
};
</script>

<style>
</style>