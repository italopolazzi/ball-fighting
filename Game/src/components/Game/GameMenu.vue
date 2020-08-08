<template>
  <div class="game-menu">
    <v-card>
      <v-card-text>
        <div class="overline mt-2">{{ namespace }}</div>
        <v-row>
          <v-col>
            <v-btn title="Back to launcher" icon @click="backToLauncher">
              <v-icon>mdi-stop</v-icon>
            </v-btn>

            <v-btn icon @click="fullscreenToogle">
              <v-icon>mdi-pause</v-icon>
            </v-btn>

            <v-btn icon @click="fullscreenToogle">
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <div class="overline mt-2">Display</div>
        <v-row>
          <v-col>
            <v-btn icon @click="fullscreenToogle">
              <v-icon>mdi-stop</v-icon>
            </v-btn>

            <v-btn icon @click="fullscreenToogle">
              <v-icon>mdi-pause</v-icon>
            </v-btn>

            <v-btn icon @click="fullscreenToogle">
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <div class="overline mt-2">Namessis</div>
        <v-row>
          <v-col>
            <v-btn icon @click="fullscreenToogle">
              <v-icon>{{ fullscreen_icon }}</v-icon>
            </v-btn>

            <v-btn icon @click="fullscreenToogle">
              <v-icon>{{ fullscreen_icon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <div class="overline mt-2">Namessis</div>
        <v-row>
          <v-col>
            <v-btn icon @click="fullscreenToogle">
              <v-icon>{{ fullscreen_icon }}</v-icon>
            </v-btn>

            <v-btn icon @click="fullscreenToogle">
              <v-icon>{{ fullscreen_icon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "game-menu",
  props: {
    namespace: {
      type: String,
      required: true
    }
  },
  computed: {
    fullscreen_icon() {
      return this.fullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen";
    }
  },
  data() {
    return {
      fullscreen: false
    };
  },
  methods: {
    backToLauncher() {
      this.$router.push({ name: "launcher-hall" });
    },
    fullscreenToogle() {
      if (this.fullscreen) {
        document.exitFullscreen();
      } else {
        document.body.requestFullscreen();
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>
