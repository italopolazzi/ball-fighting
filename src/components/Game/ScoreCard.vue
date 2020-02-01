<template>
  <div class="score-card">
    <v-card min-width="400" flat color="transparent">
      <v-card-text>
        <v-row>
          <v-col class="d-flex justify-center">
            <v-slide-y-transition mode="out-in" appear>
              <v-icon
                v-if="player.constructor"
                :color="player.character.id"
              >{{ player.constructor.name === 'HumanPlayer' ? 'mdi-emoticon' : 'mdi-robot'}}</v-icon>
            </v-slide-y-transition>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-slide-y-transition mode="out-in" appear group>
              <v-icon
                v-for="(heart, heart_index) in total_lifes"
                :key="heart_index"
                color="red"
              >{{ player.character.lifes >= (heart_index + 1) ? 'mdi-heart' : 'mdi-heart-broken'}}</v-icon>
            </v-slide-y-transition>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-slide-y-transition mode="out-in" appear>
              <v-icon
                v-if="player.character.effect"
                :color="player.character.effect.color"
              >mdi-cookie</v-icon>
            </v-slide-y-transition>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-progress-linear
              :color="player.character.life_points <= 20 ? 'red' : 'green'"
              :size="60"
              :width="4"
              :rounded="true"
              :value="player.character.life_points"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-center" title="win">
            <div class="d-flex flex-column">
              <v-icon>mdi-emoticon-cool</v-icon>
              <span class="text-center">{{ player.results.win }}</span>
            </div>
          </v-col>
          <v-col class="d-flex justify-center" title="tied">
            <div class="d-flex flex-column">
              <v-icon>mdi-emoticon-neutral</v-icon>
              <span class="text-center">{{ player.results.tied }}</span>
            </div>
          </v-col>
          <v-col class="d-flex justify-center" title="lose">
            <div class="d-flex flex-column">
              <v-icon>mdi-emoticon-dead</v-icon>
              <span class="text-center">{{ player.results.lose }}</span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "score-card",
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      total_lifes: null
    };
  },
  created() {
    this.total_lifes = this.player.character.lifes_initial;
  }
};
</script>

<style lang="sass" scoped>

</style>
