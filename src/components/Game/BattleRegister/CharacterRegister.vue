<template>
  <div class="character-register">
    <div class="display-2">Character register</div>
    <div class="body-2">Select your Character</div>

    <!-- ini ITEM-GROUP -->
    <v-item-group>
      <v-container fluid>
        <v-row no-gutters>
          <v-col v-for="character in characters" :key="character" cols="12" sm="1">
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                :color="character.color"
                :elevation="active ? 10 : 0"
                class="d-flex align-center text-center"
                width="64"
                height="64"
                @click="toggle"
              >
                <v-card-text>
                  <v-icon v-if="active">mdi-check</v-icon>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <!-- end ITEM-GROUP -->
  </div>
</template>

<script>
export default {
  name: "character-register",
  data() {
    return {
      characters: {
        red: { color: "red", title: "red" },
        green: { color: "green", title: "green" },
        blue: { color: "blue", title: "blue" },
        purple: { color: "purple", title: "purple" },
        yellow: { color: "yellow", title: "yellow" },
        orange: { color: "orange", title: "orange" },
        pink: { color: "pink", title: "pink" }
      }
    };
  }
};
</script>

<style>
/* .radio-item {
  width: 300px;
  height: 300px;
  background: red
} */
</style>