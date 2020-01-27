<template>
  <div class="level-register">
    <v-item-group>
      <v-container fluid>
        <v-row>
          <v-col v-for="(available_level, key) in available_levels" :key="key">
            <v-item v-slot:default="{toggle}">
              <v-card
                @click="toggle(); setLevel(available_level)"
                :outlined="available_level === choosed_level"
              >
                <v-card-title>{{key}}</v-card-title>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "level-register",
  props: {
    value: { required: true }
  },
  computed: {
    ...mapGetters("register/dual", {
      available_levels: "getAvailableLevels",
      choosed_level: "getChoosedLevel"
    })
  },
  methods: {
    ...mapActions("register/dual", ["setChoosedLevel"]),
    setLevel(level) {
      this.setChoosedLevel(level);
      this.value = !!level;
    }
  },
  watch: {
    value(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style>
</style>