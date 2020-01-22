<template>
  <div class="battle-camp" :id="canvas_container_id"></div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "battle-camp",
  data() {
    return {
      canvas_container_id: "battle-camp"
    };
  },
  methods: {
    ...mapActions("game/offline_single", ["startBattle"])
  },
  mounted() {
    console.log("mounted");
    
    this.startBattle(this.canvas_container_id);
  }
};
</script>

<style>
</style>