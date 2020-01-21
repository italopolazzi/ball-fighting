<template>
  <div class="offline-single-register">
    <PlayerRegister :validator="registerPlayer" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PlayerRegister from "@/components/PlayerRegister";
export default {
  name: "offline-single-register",
  components: { PlayerRegister },
  methods: {
    ...mapActions("game/offline_single", ["startRegister", "registerPlayer"])
  },
  created() {
    this.startRegister();
  }
};
</script>

<style>
</style>