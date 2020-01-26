<template>
  <div class="levels-register">
    <v-row>
      <v-col>
        <LevelRegister @levelRegisterValid="register" />
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
  computed: {
    ...mapGetters("register/dual", { players: "getHumanPlayers" })
  },
  data() {
    return {
      total_valid: 0,
      rules: [() => this.total_valid === 1]
    };
  },
  methods: {
    register(bool) {
      bool ? this.total_valid++ : this.total_valid--;
    }
  }
};
</script>

<style>
</style>