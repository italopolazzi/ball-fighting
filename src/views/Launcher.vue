<template>
  <div class="launcher">
    <v-toolbar dense>
      <MainMenu />
    </v-toolbar>
    <!-- CONTENT -->
    <v-container fluid>
      <v-row>
        <v-col>
          <v-slide-x-transition mode="out-in" appear>
            <router-view />
          </v-slide-x-transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MainMenu from "@/components/Launcher/MainMenu";
export default {
  name: "launcher",
  components: { MainMenu },
  data() {
    return {
    };
  }
};
</script>
