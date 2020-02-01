<template>
  <div class="score-card">
    <v-card min-width="300" flat color="transparent">
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
                :key="player.character.effect ? player.character.effect.color : ''"
                :color="player.character.effect ? player.character.effect.color : ''"
              >{{ player.character.effect ? 'mdi-flask' : 'mdi-flask-empty-outline' }}</v-icon>
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
          <v-col
            v-for="(score, score_index) in total_score"
            :key="score_index"
            class="d-flex justify-center"
            :title="score.result"
          >
            <div class="d-flex flex-column">
              <v-icon>{{ score.icon }}</v-icon>
              <span class="text-center mt-2">{{ player.results[score.result_key] }}</span>
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
      total_lifes: null,
      total_score: [
        {
          icon: "mdi-emoticon-cool",
          result_key: "win"
        },
        {
          icon: "mdi-emoticon-neutral",
          result_key: "tied"
        },
        {
          icon: "mdi-emoticon-dead",
          result_key: "lose"
        }
      ]
    };
  },
  created() {
    this.total_lifes = this.player.character.lifes_initial;
  }
};
</script>

<style lang="sass" scoped>
.score-card
  font-weight: bolder
  font-family: monospace
  font-size: 1.4rem
</style>
