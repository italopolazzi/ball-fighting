<template>
  <div class="offline-single-register">
    
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "offline-single-register",
  methods: {
    ...mapActions({startRegister: "game/offline_single/startRegister"})
  },
  created(){
    this.startRegister()
  }
};
</script>

<style>
</style>