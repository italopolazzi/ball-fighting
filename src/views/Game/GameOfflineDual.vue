<template>
  <div class="game-offline-dual">
    <div v-if="!results" id="battle_container_id"></div>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "game-offline-dual",
  methods: {
    ...mapActions("game/dual", ["createBattle"])
  },
  computed: {
    ...mapGetters("game/dual", { results: "getResults" })
  },
  data() {
    return {
      battle_container_id: "battle_container_id"
    };
  },
  mounted() {
    this.createBattle(this.battle_container_id);
  }
};
</script>

<style>
</style>