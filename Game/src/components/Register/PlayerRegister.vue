<template>
  <div class="player-register">
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="player.nickname"
        label="Nickname"
        :rules="[validateNickname, ...nickname_rules]"
        required
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "player-register",
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
  data() {
    return {
      valid: false,
      nickname_rules: [
        v => v.length >= 5 || "Length must be greater or equal 5."
      ]
    };
  },
  beforeCreate() {
    const { namespace } = this.$options.propsData;
    this.$options.computed = {
      ...this.$options.computed,
      ...mapGetters(`register/${namespace}`, { players: "getPlayers" })
    };
  },
  methods: {
    validateNickname() {
      const nicknameDifferent = (player, players) => {
        const same_nickname = Object.values(players).some(p => {
          if (p === player) return false;
          return p.nickname === player.nickname;
        });
        return !same_nickname;
      };

      const { player, players } = this;
      const different = nicknameDifferent(player, players);
      return different || "Another player is already using this nickname.";
    }
  },
  watch: {
    valid(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style>
</style>