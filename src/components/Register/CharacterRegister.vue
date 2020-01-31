<template>
  <div class="character-register">
    <ItemGroupSelector
      :available_items="available_characters"
      :selected_items="characters"
      v-model="value"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ItemGroupSelector from "@/components/ItemGroupSelector";

export default {
  name: "character-register",
  components: { ItemGroupSelector },
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value: null
    };
  },
  computed: {
    ...mapGetters("register/dual", {
      available_characters: "getAvailableCharacters",
      characters: "getCharacters",
      state: "getState"
    }),
    valid() {
      return this.player.character;
    }
  },
  methods: {
    ...mapActions("register/dual", ["setCharacterForPlayer"])
  },
  watch: {
    value(val) {
      const player_key = this.player.key;
      const character = val;
      this.setCharacterForPlayer({ player_key, character });
    },
    valid(val) {      
        this.$emit("input", !!val);
    }
  }
};
</script>