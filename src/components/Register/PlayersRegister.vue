<template>
  <div class="players-register">
    <v-row>
      <v-col v-for="(player, key) in players" :key="key">
        <PlayerRegister v-model="valids[key]" :player="player" :namespace="namespace" />
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
  props: {
    namespace: {
      type: String,
      required: true
    }
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
  },
  beforeCreate() {
    const { namespace } = this.$options.propsData;
    this.$options.computed = {
      ...this.$options.computed,
      ...mapGetters(`register/${namespace}`, { players: "getHumanPlayers" })
    };
  }
};
</script>

<style>
</style>