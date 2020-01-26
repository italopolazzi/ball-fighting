<template>
  <div class="character-register">
    <v-btn @click="character_index = 1">1</v-btn>
    <v-btn @click="character_index = 4">4</v-btn>
    <ItemGroupSelector :items="available_characters" v-model="character_index" :rules="rules" />
    {{character_index}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ItemGroupSelector from "@/components/Register/ItemGroupSelector";

export default {
  name: "character-register",
  components: { ItemGroupSelector },
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters("register/dual", {
      available_characters: "getAvailableCharacters",
      characters: "getCharacters"
    }),
    rules() {
      // console.log(this.available_characters);
      const characters = this.characters;
      // console.log(characters);

      return [];
    }
  },
  data() {
    return {
      character_index: false
    };
  }
};
</script>