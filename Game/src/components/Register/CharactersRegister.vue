<template>
  <div class="characters-register">
    <v-row>
      <v-col v-for="(player, key) in players" :key="key">
        <CharacterRegister v-model="valids[key]" :namespace="namespace" :player="{key, ...player}" />
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
      ...mapGetters(`register/${namespace}`, {
        players: "getPlayers"
      })
    };
  }
};
</script>

<style>
</style>