<template>
  <div class="launcher-about">
    <v-container fluid>
      <v-row no-gutters>
        <AboutRules />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AboutRules from "@/views/Launcher/About/AboutRules";
export default {
  name: "launcher-about",
  components: { AboutRules }
};
</script>