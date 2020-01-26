<template>
  <div class="level-register">
    <v-item-group>
      <v-container fluid>
        <v-row>
          <v-col v-for="(level, key) in available_levels" :key="key">
            <v-item v-slot:default="{active, toggle}">
              <v-card @click="toggle(); setLevel(level)" :outlined="active">
                <v-card-title>{{key}}</v-card-title>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    {{choosed_level}}
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "level-register",
  computed: {
    ...mapGetters("register/dual", {
      available_levels: "getAvailableLevels",
      choosed_level: "getChoosedLevel"
    })
  },
  data() {
    return {
      valid: false,
      leve: null
    };
  },
  methods: {
    ...mapActions("register/dual", ["setChoosedLevel"]),
    setLevel(level) {
      this.setChoosedLevel(level);
      this.valid = true;
    }
  },
  watch: {
    valid(val, old_val) {
      if (val !== old_val) {
        this.$emit("levelRegisterValid", val);
      }
    }
  }
};
</script>

<style>
</style>