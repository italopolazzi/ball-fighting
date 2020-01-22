<template>
  <div class="battle-register">
    <v-stepper v-model="current_index" :alt-labels="true">
      <template>
        <v-stepper-header>
          <template v-for="(component, index) in components">
            <v-stepper-step
              :key="index"
              :complete="completes[component.name]"
              :step="index"
              :rules="[]"
            >Step {{ index }}</v-stepper-step>

            <v-divider v-if="index !== steps -1" :key="component.name"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content v-for="(component, index) in components" :key="index" :step="index">
            <component :is="component" :ref="component.name" :key="component.name" />

            <v-btn @click="prevStep(index)">Back</v-btn>
            <v-btn color="primary" @click="nextStep(index)">Continue</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </template>
    </v-stepper>
    <div>
      <v-btn @click="validate">Start</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "battle-register",

  props: {
    components: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      current_index: 0,
      completes: {}
    };
  },
  computed: {
    current_component() {
      return this.components[this.current_index];
    },
    steps() {
      return this.components.length;
    }
  },
  methods: {
    validate() {
      const refs = this.$refs;
      for (let key in refs) {
        const component = refs[key][0];

        this.completes[key] =
          !component.rules ||
          component.rules.every(rule => {
            return rule() === true;
          });
      }
    },
    nextStep(n) {
      if (n === this.steps - 1) {
        this.current_index = 0;
      } else {
        this.current_index = n + 1;
      }
    },
    prevStep(n) {
      if (n === 0) {
        this.current_index = this.steps - 1;
      } else {
        this.current_index = n - 1;
      }
    }
  },
  watch: {
    steps(val) {
      // if (this.e1 > val) {
      //   this.e1 = val;
      // }
    }
  }
};
</script>

<style>
</style>