<template>
  <div class="controlers-register">
    <v-row>
      <v-col v-for="(player, key) in players" :key="key">
        <ControlsRegister v-model="valids[key]" :player="{key, ...player}" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ControlsRegister from "@/components/Register/ControlsRegister";

export default {
  name: "controlers-register",
  components: { ControlsRegister },
  computed: {
    ...mapGetters("register/dual", { players: "getHumanPlayers" })
  },
  data() {
    return {
      valids: {},
      rules: [
        () =>
          Object.values(this.valids).length ===
          Object.values(this.players).length,
        () => Object.values(this.valids).every(v => v === true)
      ]
    };
  }
};
</script>

<style>
</style>