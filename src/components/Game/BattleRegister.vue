<template>
  <div class="battle-register">
    <!-- buttons -->
    <v-toolbar>

      <v-spacer></v-spacer>

      <v-btn icon @click="prevStep()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-btn icon class="mr-3" @click="nextStep()">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>

      <v-toolbar-items>
        <v-btn @click="nextStep()">Start Battle</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- stepper -->
    <v-stepper v-model="current_index" :alt-labels="false">
      <template>
        <v-stepper-header>
          <template v-for="(component, index) in components">
            <v-stepper-step
              :key="index"
              :complete="completes[component.name]"
              :step="index"
              :rules="[]"
              :editable="true"
            >{{component.name}}</v-stepper-step>

            <v-divider v-if="index !== steps -1" :key="component.name"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content v-for="(component, index) in components" :key="index" :step="index">
            <!-- <v-row>
             <v-col class="text-left">
                <v-btn @click="prevStep(index)">Back</v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="text-right">
                <v-btn color="primary" @click="nextStep(index)">Continue</v-btn>
              </v-col>
            </v-row>-->

            <component :is="component" :ref="component.name" :key="component.name" />
          </v-stepper-content>
        </v-stepper-items>
      </template>
    </v-stepper>
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
      fab1: false,
      fab2: false,
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
    nextStep() {
      if (this.current_index === this.steps - 1) {
        this.current_index = 0;
      } else {
        this.current_index = this.current_index + 1;
      }
    },
    prevStep() {
      if (this.current_index === 0) {
        this.current_index = this.steps - 1;
      } else {
        this.current_index = this.current_index - 1;
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