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
    },
    namespace: {
      type: String,
      required: true
    }
  },
  computed: {
    valid() {
      return this.player.character;
    }
  },
  data() {
    return {
      value: null
    };
  },
  beforeCreate() {
    const { namespace } = this.$options.propsData;
    this.$options.computed = {
      ...this.$options.computed,
      ...mapGetters(`register/${namespace}`, {
        available_characters: "getAvailableCharacters",
        characters: "getCharacters",
        state: "getState"
      })
    };
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions(`register/${namespace}`, ["setCharacterForPlayer"])
    };
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