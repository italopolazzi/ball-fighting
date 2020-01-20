<template>
  <div class="key-changer">
    <v-flex xs12>
      <v-card>
        <v-list-item two-line>
          <v-list-item-content>
            <div class="title">Player {{player_key}}</div>
            <div
              class="caption"
            >These should be your keys to control the character direction when the game starts</div>
          </v-list-item-content>
        </v-list-item>
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap>
              <!-- ini KEYS -->
              <v-flex xs4 />

              <v-flex xs4 text-center>
                <v-btn @click="configKey('top')" :disabled="!keys.top">{{keys.top}}</v-btn>
              </v-flex>
              <v-flex xs4 />

              <v-flex xs4 text-right>
                <v-btn @click="configKey('left')" :disabled="!keys.left">{{keys.left}}</v-btn>
              </v-flex>
              <v-flex xs4 />
              <v-flex xs4 text-left>
                <v-btn @click="configKey('right')" :disabled="!keys.right">{{keys.right}}</v-btn>
              </v-flex>

              <v-flex xs4 />
              <v-flex xs4 text-center>
                <v-btn @click="configKey('bottom')" :disabled="!keys.bottom">{{keys.bottom}}</v-btn>
              </v-flex>
              <v-flex xs4 />
              <!-- end KEYS -->
            </v-layout>
          </v-container>
        </v-card-text>
        <!-- ACTIONS -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn tile text color="red" @click="restoreDefaults">restore</v-btn>
          <v-btn tile text color="green" @click="changePlayerControls">
            <v-icon left>mdi-check</v-icon>accept
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "key-changer",
  props: {
    player_key: {
      type: String,
      default: "client_player"
    }
  },
  data() {
    return {
      keys: null
    };
  },
  created() {
    this.setKeys();
  },
  computed: {
    ...mapGetters({
      validNewKey: "game/validNewKey",
      getControlsForPlayers: "game/getControlsForPlayers"
    })
  },
  methods: {
    setKeys() {
      this.keys = this.getControlsForPlayers[this.player_key];
    },
    changePlayerControls() {
      this.$store.dispatch("game/changePlayerControls", this);
    },
    restoreDefaults() {
      this.$store.dispatch("game/restoreDefaults", this);
    },
    configKey(key) {
      const original = this.keys[key];

      this.keys[key] = null;

      const changeKey = e => {
        window.removeEventListener("keydown", changeKey);
        if (this.validNewKey(e.key)) this.keys[key] = e.key;
        else {
          const timeout = setTimeout(() => {
            this.keys[key] = original;
            clearTimeout(timeout);
          }, 1000);
        }
      };

      window.addEventListener("keydown", changeKey);
    }
  },
  watch: {
    getControlsForPlayers: {
      deep: true,
      handler(n, o) {
        this.setKeys();
      }
    }
  }
};
</script>

<style>
</style>