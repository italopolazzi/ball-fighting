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
                elevation="0"
              >
                <v-card-text class="text-center headline">{{key}}</v-card-text>
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
    value: { required: true },
    namespace: {
      type: String,
      required: true
    }
  },
  beforeCreate() {
    const { namespace } = this.$options.propsData;
    this.$options.computed = {
      ...this.$options.computed,
      ...mapGetters(`register/${namespace}`, {
        available_levels: "getAvailableLevels",
        choosed_level: "getChoosedLevel"
      })
    };
    this.$options.methods = {
      ...this.$options.methods,
      ...mapActions(`register/${namespace}`, ["setChoosedLevel"])
    };
  },
  methods: {
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