<template>
  <div class="game-offline">

    <div v-if="loading">
      <v-progress-linear indeterminate color="green" />
    </div>

    <div v-if="battle">
      <div class="overlay">
        <v-container fluid class="fill-height">
          <v-row class="half-height" justify="start" no-gutters>
            <v-col>
              <ScoresContainer :players="players" />
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
                <GameMenu />
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
      ...mapActions(`game/${namespace}`, ["createBattle"])
    };
  },
  mounted() {
    this.play();
  },
  methods: {
    play() {
      this.createBattle(this.container);

      VueEventBus.$on("battleRunning", value => {
        this.battle = value;
      });
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