<template>
  <div class="level-register">
    <v-card>
      <v-card-title>Level register</v-card-title>
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
  name: "level-register",
  data() {
    return {
      nickname: "",
      error_messages: [],
      rules: [
        () => this.nickname.length === 1 || "Nickname deve ter 1 character"
      ]
    };
  }
};
</script>

<style>
</style>