<template>
  <div class="characters-register">
    <v-row>
      <v-col v-for="(player, key) in players" :key="key">
        <CharacterRegister v-model="valids[key]" :player="{key, ...player}" />
      </v-col>
    </v-row>
    CharactersRegister: {{valids}}
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
      players: "getPlayers"
    })
  },
  data() {
    return {
      valids: {},
      rules: [
        () => Object.values(this.valids).length === Object.values(this.players).length,
        () => Object.values(this.valids).every(v => v === true)
      ]
    };
  }
};
</script>

<style>
</style>