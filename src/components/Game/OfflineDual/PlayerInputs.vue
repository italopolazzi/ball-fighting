<template>
  <div class="player-inputs">
    <v-form ref="form" v-model="player.valid" lazy-validation>
      <v-card :disabled="card_disabled">
        <v-card-title>
          <div class="overline">Insert your info</div>
          <v-list-item-title class="headline mb-1">Player {{player.nick_name || index}}</v-list-item-title>
        </v-card-title>
        <v-card-text>
          <v-text-field
            solo
            color="green"
            type="text"
            :rules="nickRules"
            label="Your nick_name"
            v-model="player.nick_name"
            required
            :error-messages="error_messages"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="validatePlayer">Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  name: "player-inputs",
  computed: {
    nickRules() {
      return this.$store.getters["game/offline_dual/players/getNickRules"];
    }
  },
  data() {
    return {
      card_disabled: false,
      player: {
        valid: false
      },
      error_messages: []
    };
  },
  methods: {
    validatePlayer() {
      if (this.$refs.form.validate()) {
        try {
          this.registerNewPlayer()
          this.disableCard();
          this.resetErrorMessages();
        } catch (error) {
          this.error_messages.push(error.message);
        }
      }
    },
    disableCard() {
      this.card_disabled = true;
    },
    resetErrorMessages() {
      this.error_messages = [];
    },
    registerNewPlayer(){
          this.$store.dispatch("game/offline_dual/players/registerNewPlayer", this.player);
    }
  }
};
</script>

<style>
</style>