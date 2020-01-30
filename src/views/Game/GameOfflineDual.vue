<template>
  <div class="game-offline-dual">
    <div v-if="loading" class="loader">
      <div class="display-4">loading...</div>
    </div>
    <div v-else-if="!results" class="battle">
      <div class="counter">
        <h1>Counter</h1>
        <strong>{{counter}}</strong>
      </div>
      <v-container fluid class="fill-height">
        <v-row class="d-flex justify-between align-center">
          <v-col v-for="(player, player_key) in players" :key="player_key">
            <v-card>
              <v-card-title>{{player_key}}</v-card-title>
              <v-card-text>
                <div class="item">
                  <strong>Id</strong>
                  {{player.character.id}}
                </div>

                <div class="item">
                  <strong>Lifes</strong>
                  {{player.character.lifes}}
                </div>

                <div class="item">
                  <strong>Life points</strong>
                  {{player.character.life_points}}
                </div>


                <div class="item">
                  <strong>Color</strong>
                  {{player.character.color}}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else id="results">
      <v-container fluid>
        <v-row>
          <v-col v-for="(player, key) in results" :key="key">
            <v-card>
              <v-card-title>{{key}}</v-card-title>
              <v-card-text>
                <div class="results">{{player.result}}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn :to="{name: 'launcher-hall'}">Exit to hall</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div id="battle_container_id"></div>
  </div>
</template>

<script>
import { VueEventBus } from "@/plugins/eventBus";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "game-offline-dual",
  methods: {
    ...mapActions("game/dual", ["createBattle"])
  },
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
      counter: 0,
      battle: null
    };
  },
  mounted() {
    this.createBattle(this.battle_container_id);
    VueEventBus.$on("battleRunning", value => {
      this.battle = value;
      this.counter++;
    });
  }
  // watch:{
  //   battle(val){}
  // }
};
</script>

<style>
</style>