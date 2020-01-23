<template>
  <div class="level-register">
    <v-card>
      <v-card-title>Level register</v-card-title>
      <v-card-text>
        {{radio_group}}
        <!-- ini ITEM-GROUP -->
        <v-item-group>
          <v-container>
            <v-row>
              <v-col v-for="level in levels" :key="level" cols="12" md="4">
                <v-item v-slot:default="{ active, toggle }">
                  <v-card
                    :color="active ? 'secondary' : level.color"
                    class="d-flex align-center"
                    dark
                    height="200"
                    @click="toggle"
                  >
                    <v-scroll-y-transition>
                      <div v-if="active" class="display-3 flex-grow-1 text-center">{{level.title}}</div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
        <!-- end ITEM-GROUP -->
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "level-register",
  data() {
    return {
      levels: {
        easy: { color: "green", value: 1, title: "Easy" },
        medium: { color: "yellow", value: 2, title: "Medium" },
        hard: { color: "red", value: 3, title: "Hard" }
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