<template>
  <div class="game-offline-dual">
    <div v-if="loading" class="loader">
      <v-progress-linear indeterminate color="green" />
    </div>
    <div v-if="battle" class="score">
      <ScoresContainer :players="players" />
      <v-btn @click="play">Play Again</v-btn>
      <v-btn :to="{name:'launcher-hall'}">Exit to launcher</v-btn>
    </div>
    <div id="battle_container_id"></div>
  </div>
</template>

<script>
import ScoresContainer from "@/components/Game/ScoresContainer";
import { VueEventBus } from "@/plugins/eventBus";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "game-offline-dual",
  components: { ScoresContainer },
  computed: {
    ...mapGetters("game/dual", { results: "getResults" }),
    players() {
      return this.battle.players;
    },
    loading() {
      return !this.battle;
    }
  },
  data() {
    return {
      battle_container_id: "battle_container_id",
      battle: null
    };
  },
  mounted() {
    this.play();
  },
  methods: {
    ...mapActions("game/dual", ["createBattle"]),
    play() {
      this.createBattle(this.battle_container_id);

      VueEventBus.$on("battleRunning", value => {
        this.battle = value;
      });
    }
  }
};
</script>

<style lang="sass" scoped>
body
  overflow: hidden
.score
  position: absolute
  top: 0
  left: 0
  right: 0
.translucent
  opacity: 0.2

</style>