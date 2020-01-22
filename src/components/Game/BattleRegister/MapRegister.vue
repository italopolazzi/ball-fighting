<template>
  <div class="map-register">
    <v-card>
      <v-card-title>Map register</v-card-title>
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
  name: "map-register",
  data() {
    return {
      nickname: "",
      error_messages: [],
      rules: [
        () => this.nickname.length === 4 || "Nickname deve ter 4 characteres"
      ]
    };
  }
};
</script>

<style>
</style>