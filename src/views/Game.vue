<template>
  <div class="game">
    <v-btn @click="backToLaucherHall">Left the battle</v-btn>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "game",
  methods: {
    backToLaucherHall() {
      this.$router.push({ name: "launcher-hall" });
    }
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  }
};
</script>

<style scoped>
.game {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: rebeccapurple;
  width: 100%;
  height: 100%;
}
</style>