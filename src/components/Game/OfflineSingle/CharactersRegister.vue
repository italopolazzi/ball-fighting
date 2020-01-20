<template>
  <div class="character-register">
    <v-container fluid>
      <v-layout row fill-height>
        <v-flex xs6 v-for="(player, key) in players" :key="key">
          <CharactersGrid :available_characters="available_characters" :player_key="key" />
          {{player}}
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import CharactersGrid from "@/components/Game/OfflineSingle/CharactersGrid";
import { mapGetters } from "vuex";

export default {
  name: "character-register",
  components: { CharactersGrid },
  computed: {
    ...mapGetters({
      choosed_characters: "game/offline_dual/characters/getChoosedCharacters",
      available_characters: "game/offline_dual/characters/getAvailableCharacters",
      players: "game/offline_dual/players/getPlayers"
    })
  },
  data() {
    return {
      rules: [
        () =>
          Object.keys(this.choosed_characters).length === 2 ||
          "Escolha no mínimo 2 personagens"
      ]
    };
  },
  beforeDestroy() {
    this.$store.dispatch("game/offline_dual/characters/instantiateCharacters");
  }
};
</script>

<style>
</style>