<template>
  <div class="levels-register">
    <v-row>
      <v-col>
        <LevelRegister v-model="valid" :namespace="namespace" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LevelRegister from "@/components/Register/LevelRegister";

export default {
  name: "levels-register",
  components: { LevelRegister },
  props: {
    namespace: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      rules: [() => !!this.valid]
    };
  }
};
</script>

<style>
</style>