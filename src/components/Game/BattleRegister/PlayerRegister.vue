<template>
  <div class="player-register">
    <v-card>
      <v-card-title>Player register</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="nickname"
          type="text"
          placeholder="Nickname"
          :error-messages="error_messages"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "player-register",
  data() {
    return {
      nickname: "",
      error_messages: [],
      rules: [
        () =>
          this.nickname.length < 3 ||
          "Nickname deve ser menor que 3 characteres"
      ]
    };
  }
};
</script>

<style>
</style>