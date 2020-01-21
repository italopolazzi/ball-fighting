<template>
  <div class="offline-dual-register">
    <PlayerRegister :validator="registerPlayer" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PlayerRegister from "@/components/PlayerRegister"
export default {
  name: "offline-dual-register",
  components: {PlayerRegister},
  methods: {
    ...mapActions("game/offline_dual", ["startRegister", "registerPlayer"] )
  },
  created(){
    this.startRegister()
  }
};
</script>

<style>
</style>