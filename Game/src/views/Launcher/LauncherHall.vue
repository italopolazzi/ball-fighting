<template>
  <div class="launcher-hall">
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
  name: "launcher-hall",
  components: { AboutRules }
};
</script>