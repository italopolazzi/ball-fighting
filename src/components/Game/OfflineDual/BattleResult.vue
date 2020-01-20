<template>
  <v-card class="battle-result">
    <v-card-title>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="nick-name overline">{{nick_name}}</div>
          <div class="title final-status">{{final_status}}</div>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-card-text>
      <div class="statiscs">
        <div class="player-results">{{results}}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "battle-result",
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  computed: {
    nick_name() {
      return this.player.nick_name;
    },
    final_status() {
      return this.player.results.final_status;
    },
    results() {
      return this.player.results;
    }
  }
};
</script>

<style>
</style>