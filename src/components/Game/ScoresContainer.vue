<template>
  <div class="scores-container">
    <v-container fluid class="fill-height">
      <v-row class="d-flex justify-between align-center">
        <v-col
          v-for="(player, player_index) in players"
          :key="player_index"
          :class="{'d-flex': true, 'justify-end': player_index % 2 !== 0}"
        >
          <ScoreCard :player="player" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ScoreCard from "@/components/Game/ScoreCard";
export default {
  name: "scores-container",
  components: { ScoreCard },
  props: {
    players: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>