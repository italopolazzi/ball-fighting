<template>
  <div class="character-register">
    <v-card>
      <v-card-title>Character register</v-card-title>
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
  name: "character-register",
  data() {
    return {
      nickname: "",
      error_messages: [],
      rules: [
        () => this.nickname.length === 3 || "Nickname deve ter 3 characteres"
      ]
    };
  }
};
</script>

<style>
</style>