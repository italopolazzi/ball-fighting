<template>
  <div class="players-register">
    <v-row>
      <v-col v-for="(player, player_key) in players" :key="player_key">
        <PlayerRegister @playerRegisterValid="register" :player="{key: player_key, ...player}" />
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
  },
  data() {
    return {
      total_valid: 0,
      rules: [() => this.total_valid === Object.keys(this.players).length]
    };
  },
  methods: {
    register(bool) {
      bool ? this.total_valid++ : this.total_valid--;
    }
  }
};
</script>

<style>
</style>