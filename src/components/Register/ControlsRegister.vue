<template>
  <div class="controls-register">
    <!-- keys-selector -->
    <KeysSelector :used_keys="used_keys" v-model="value" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import KeysSelector from "@/components/KeysSelector";

export default {
  name: "controls-register",
  components: { KeysSelector },
  props: {
    player: {
      type: Object,
      required: true
    },
    namespace: {
      type: String,
      required: true
    }
  },
  computed: {
    valid() {
      return !!this.value;
    },
    player_controls() {
      return this.getPlayerControls(this.player.key);
    }
  },
  data() {
    return {
      value: null
    };
  },
  beforeCreate() {
    const { namespace } = this.$options.propsData;
    this.$options.computed = {
      ...this.$options.computed,
      ...mapGetters(`register/${namespace}`, { players: "getPlayers" }),
      ...mapGetters("launcher", ["getPlayerControls"]),
      ...mapGetters("launcher", { used_keys: "getUsedKeys" })
    };
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions(`register/${namespace}`, ["setControlsForPlayer"])
    };
  },
  created() {
    // starts value
    this.value = this.getPlayerControls(this.player.key);
  },
  watch: {
    value(val) {
      const player_key = this.player.key;
      const controls = val;
      this.setControlsForPlayer({ player_key, controls });
    },
    valid(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style>
</style>

