<template>
  <div class="game-offline">
    <div v-if="loading">
      <v-progress-linear indeterminate color="green" />
    </div>

    <div v-if="battle">
      <div class="overlay">
        <v-container fluid class="fill-height">
          <v-row class="half-height" justify="start" no-gutters>
            <v-col :cols="12">
              <ScoresContainer :players="players" />
            </v-col>
            <v-col v-if="battle_results" :cols="12" class="d-flex align-start justify-center">
              <v-container fluid class="pa-0">
                <v-row no-gutters>
                  <v-col cols="0" md="4"></v-col>
                  <v-col cols="12" md="4">
                    <v-card tile color="red">
                      <v-card-title>Results</v-card-title>
                      <v-card-actions>
                        <v-btn text :to="{name: 'launcher-register'}">
                          <v-icon left>mdi-backburger</v-icon>Exit
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn text @click="playAgain" color="white">
                          <v-icon left>mdi-restart</v-icon>Play again
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col cols="0" md="4"></v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>

          <v-row class="half-height" justify="end" no-gutters>
            <v-col :cols="4" class="d-flex align-end justify-end">
              <v-menu offset-overflow>
                <template #activator="{on}">
                  <v-btn color="red" fab v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <GameMenu :namespace="$route.params.namespace" />
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import GameMenu from "@/components/Game/GameMenu";
import ScoresContainer from "@/components/Game/ScoresContainer";
import { VueEventBus } from "@/plugins/eventBus";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "game-offline",
  components: { ScoresContainer, GameMenu },
  computed: {
    players() {
      return this.battle.players;
    },
    loading() {
      return !this.battle;
    }
  },
  data() {
    return {
      container: "container",
      battle: null,
      no_gutters: true,
      dense: false
    };
  },
  beforeCreate() {
    const namespace = this.$route.params.namespace;
    this.$options.computed = {
      ...this.$options.computed,
      ...mapGetters(`game/${namespace}`, { battle_results: "getBattleResults" })
    };
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions(`game/${namespace}`, ["createBattle", "playAgain"])
    };
  },
  mounted() {
    this.play();
  },
  methods: {
    play() {
      this.battle = null;
      const seconds = 0;
      const timeout = setTimeout(() => {
        this.createBattle(this.container);

        VueEventBus.$on("battleRunning", value => {
          this.battle = value;
        });

        clearTimeout(timeout);
      }, seconds * 1000);
    }
  }
};
</script>

<style lang="sass" scoped>

.half-height
  height: 50%

.overlay
  position: absolute
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  z-index: 1

.linha
  background: red

.coluna
  background: blue

</style>