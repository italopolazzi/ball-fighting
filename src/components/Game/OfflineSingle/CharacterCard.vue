<template>
  <div class="character-card">
    <v-card @click="characterSelection" :disabled="card_selected" class outlined tile>
      <v-card-title>
        <v-list-item-title class="headline mb-1">Character {{character.name}}</v-list-item-title>
      </v-card-title>

      <v-card-text>
        <v-img :src="character.img_src" :aspect-ratio="16/9"></v-img>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "character-card",
  props: {
    character: {
      type: Object,
      required: true
    },
    player_key: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      card_selected: false
    };
  },
  computed: {
    ...mapGetters({
      choosed_characters: "game/offline_single/characters/getChoosedCharacters"
    })
  },
  methods: {
    characterSelection() {
      this.$store.dispatch("game/offline_single/characters/chooseCharacter", this);
    },
    toggleCard(available_characters) {
      this.card_selected =
        available_characters[this.player_key] === this.character;
    }
  },
  created() {
    this.toggleCard(this.choosed_characters);
  },
  watch: {
    choosed_characters: {
      deep: true,
      handler(newValue) {
        this.toggleCard(newValue);
      }
    }
  }
};
</script>

<style>
</style>