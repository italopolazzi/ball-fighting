<template>
  <div class="characters-register">
    <v-row>
      <v-col v-for="(player, player_key) in players" :key="player_key">
        <CharacterRegister
          @characterRegisterValid="register"
          :player="{key: player_key, ...player}"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CharacterRegister from "@/components/Register/CharacterRegister";

export default {
  name: "characters-register",
  components: { CharacterRegister },
  computed: {
    ...mapGetters("register/dual", {
      players: "getPlayers",
      characters: "getAvailableCharacters"
    })
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