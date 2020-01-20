<template>
  <div class="characters-grid">
    <v-container fluid>
      <v-layout row fill-height>
        <v-flex xs4 v-for="(character, key) in available_characters" :key="key">
          <CharacterCard :character="character" :player_key="player_key" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import CharacterCard from "@/components/Game/OfflineDual/CharacterCard";
export default {
  name: "characters-grid",
  components: { CharacterCard },
  props: {
    available_characters: {
      type: Object,
      required: true
    },
    player_key: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
</style>