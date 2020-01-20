<template>
  <div class="launcher">
    <v-toolbar dense>
      <LauncherMenu />
    </v-toolbar>
    <!-- CONTENT -->
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-slide-x-transition mode="out-in" appear>
            <router-view />
          </v-slide-x-transition>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import LauncherMenu from "@/components/Launcher/LauncherMenu";
export default {
  name: "launcher",
  components: { LauncherMenu }
};
</script>
