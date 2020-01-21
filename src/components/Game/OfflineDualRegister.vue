<template>
  <div class="offline-dual-register">
    
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "offline-dual-register",
  methods: {
    ...mapActions({startRegister: "game/offline_dual/startRegister"})
  },
  created(){
    this.startRegister()
  }
};
</script>

<style>
</style>