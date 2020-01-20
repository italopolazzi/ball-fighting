<template>
  <div class="controls-select">
    <v-col cols="12" class="display-1 text-left">Players choose your sides</v-col>
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <KeyChanger />
      </v-col>
      <v-col cols="12" sm="6">
        <KeyChanger :player_key="'guest_player'" />
      </v-col>
      <v-col
        cols="12"
        class="caption text-center"
      >You can change the favorite combination at Options/Controls in the Launcher</v-col>
    </v-row>
  </div>
</template>

<script>
import KeyChanger from "@/components/Launcher/Options/Controls/KeyChanger";
export default {
  name: "controls-select",
  components: { KeyChanger }
};
</script>

<style>
</style>