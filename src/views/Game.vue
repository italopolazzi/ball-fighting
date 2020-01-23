<template>
  <div class="game">
    <v-row>
      <v-col>
        <v-menu offset-y>
          <template #activator="{on}">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <!-- <v-list>
        <v-list-item v-for="component in components" :key="component.name" @click="">{{component.name}}</v-list-item>
          </v-list>-->

          <v-card>
            <!-- <v-card-title>Options</v-card-title> -->
            <v-card-text>
              <!-- <v-divider class="mb-1 mt-5"></v-divider> -->
              <div class="overline">Battle state</div>

              <!-- skull -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="backToLaucherHall">
                    <v-icon>mdi-skull</v-icon>
                  </v-btn>
                </template>
                <span class="text-capitalize">left</span>
              </v-tooltip>

              <!-- pause -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-pause</v-icon>
                  </v-btn>
                </template>
                <span class="text-capitalize">pause</span>
              </v-tooltip>

              <!-- play -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-play</v-icon>
                  </v-btn>
                </template>
                <span class="text-capitalize">play</span>
              </v-tooltip>

              <v-divider class="mb-1 mt-5"></v-divider>
              <div class="overline">Info</div>

              <!-- settings -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-settings</v-icon>
                  </v-btn>
                </template>
                <span class="text-capitalize">settings</span>
              </v-tooltip>

              <!-- information -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-information</v-icon>
                  </v-btn>
                </template>
                <span class="text-capitalize">information</span>
              </v-tooltip>

              <v-divider class="mb-1 mt-5"></v-divider>
              <div class="overline">Sound</div>

              <!-- bell-off -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-bell-off</v-icon>
                  </v-btn>
                </template>
                <span class="text-capitalize">bell-off</span>
              </v-tooltip>

              <!-- bell -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-bell</v-icon>
                  </v-btn>
                </template>
                <span class="text-capitalize">bell</span>
              </v-tooltip>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "game",
  methods: {
    backToLaucherHall() {
      this.$router.push({ name: "launcher-hall" });
    }
  },
  beforeRouteLeave(to, from, next) {
    // const answer = window.confirm(
    //   "Do you really want to leave? you have unsaved changes!"
    // );
    const answer = true;
    if (answer) {
      next();
    } else {
      next(false);
    }
  }
};
</script>
