<template>
  <div class="controls-register">
    <!-- keys-selector -->
    <KeysSelector :used_keys="used_keys" v-model="value" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import KeysSelector from "@/components/Register/KeysSelector";

export default {
  name: "controls-register",
  components: { KeysSelector },
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters("register/dual", { players: "getPlayers" }),
    ...mapGetters("launcher", ["getPlayerControls"]),
    ...mapGetters("launcher", { used_keys: "getUsedKeys" }),
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
  created() {
    // starts value
    this.value = this.getPlayerControls(this.player.key);
  },
  methods: {
    ...mapActions("register/dual", ["setControlsForPlayer"])
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

