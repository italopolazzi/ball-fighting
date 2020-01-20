<template>
  <div class="battle-camp">
    <v-fade-transition mode="out-in">
      <div v-if="results" id="battle-results">
        <v-container fluid>
          <v-layout fill-height wrap row>
            <v-flex xs6 v-for="(player, key) in results" :key="key" class="pa-5">
              <BattleResult :player="player" />
            </v-flex>
            <v-flex xs12 text-center>
              <v-btn @click="playAgain">Jogar novamente</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-fade-transition>
    <canvas :id="canvas_id"></canvas>
  </div>
</template>

<script>
import BattleResult from "@/components/Game/OfflineSingle/BattleResult";
import { mapGetters, mapActions } from "vuex";
import { clearInterval } from "timers";
export default {
  name: "battle-camp",
  components: { BattleResult },
  computed: {
    ...mapGetters({ results: "game/offline_single/battle/getBattleResults" })
  },
  data() {
    return {
      canvas_id: "battle-camp"
    };
  },
  mounted() {
    this.play();
  },
  methods: {
    ...mapActions({
      resetBattle: "game/offline_single/battle/resetBattle",
      startBattle: "game/offline_single/battle/startBattle"
    }),
    playAgain() {
      this.resetBattle();
      this.play();
    },
    play() {
      this.startBattle(this.getBattleCampCanvasContext());
      console.log("started called");
      
    },
    getBattleCampCanvasContext() {
      // the html element canvas
      const canvas = document.getElementById(this.canvas_id);
      if (canvas) {
        // resize the canvas with window's size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // get canvas' context
        return canvas.getContext("2d");
      }
    }
  }
};
</script>

<style scoped>
.scores {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(32, 178, 171, 0.6);
  color: black;
  z-index: 1;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20vh;
}

canvas {
  position: absolute;
  left: 0;
  top: 0;
  background: lightskyblue;
  z-index: 0;
}

#battle-results {
  position: absolute;
  z-index: 1;
}
</style>