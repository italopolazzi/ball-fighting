<template>
  <div class="scores-container">
    <v-container fluid class="fill-height pa-0">
      <v-row class="d-flex justify-between align-center" no-gutters>
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

<style lang="sass" scoped>
.menu
  z-index:1
</style>>
