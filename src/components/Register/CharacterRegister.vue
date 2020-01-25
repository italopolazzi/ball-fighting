<template>
  <div class="character-register">
    <v-item-group>
      <v-container fluid>
        <v-row no-gutters justify="start">
          <v-col v-for="(character, character_key) in available_characters" :key="character_key">
            <v-item v-slot:default="{toggle}">
              <v-card
                @click="toggle(); setCharacter(character)"
                :color="character.name.toLowerCase()"
                height="58"
                width="58"
                class="circle"
              >
                <v-card-text>
                  <v-icon
                    v-if="player.character && character.name === player.character.name"
                  >mdi-check</v-icon>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "character-register",
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters("register/dual", {
      available_characters: "getAvailableCharacters",
      characters: "getCharacters",
      state: "getState"
    })
  },
  data() {
    return {
      valid: false
    };
  },
  methods: {
    ...mapActions("register/dual", ["setCharacterForPlayer"]),
    setCharacter(character) {
      const characterDifferent = (character, characters) => {
        return !characters.includes(character);
      };

      const characters = this.characters;
      const different = characterDifferent(character, characters);

      if (different) {
        this.setCharacterForPlayer({ player_key: this.player.key, character });
      }
      this.valid = different;
      return different;
    }
  },
  watch: {
    valid(val, old_val) {
      if (val !== old_val) {
        this.$emit("characterRegisterValid", val);
      }
    }
  }
};
</script>

<style>
.circle {
  border-radius: 50% !important;
}
</style>