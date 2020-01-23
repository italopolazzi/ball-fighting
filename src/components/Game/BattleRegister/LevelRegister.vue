<template>
  <div class="level-register">
    <div class="display-2">Level register</div>
    <div class="body-2">Select your level</div>
    <!-- ini ITEM-GROUP -->
    <v-item-group>
      <v-container fluid>
        <v-row>
          <v-col v-for="level in levels" :key="level" cols="12" md="4">
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                :color="active ? 'secondary' : level.color"
                class="d-flex align-center"
                dark
                height="100"
                @click="toggle"
              >
                <v-scroll-x-transition>
                  <div v-if="active" class="display-3 flex-grow-1 text-center">Choosed</div>
                  <div v-else class="display-3 flex-grow-1 text-center">{{level.title}}</div>
                </v-scroll-x-transition>
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
  name: "level-register",
  data() {
    return {
      levels: {
        easy: { color: "blue", value: 1, title: "Easy" },
        medium: { color: "blue darken-2", value: 2, title: "Medium" },
        hard: { color: "blue darken-4", value: 3, title: "Hard" }
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