<template>
  <div class="controlers-register">
    <v-row>
      <v-col v-for="(player, key) in players" :key="key">
        <ControlsRegister v-model="valids[key]" :namespace="namespace" :player="{key, ...player}" />
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