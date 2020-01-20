<template>
  <div class="game-stepper">
    <v-card>
      <v-card-title>{{steps}}</v-card-title>
      <v-card-text>
        <component :is="current_component" ref="current_component" :key="index" />
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="prevComponent" v-if="show_prev">
          <v-icon left>mdi-arrow-left</v-icon>prev
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="nextComponent" v-if="show_next">
          next
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "game-stepper",
  props: {
    components_sequence: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      index: 0,
      show_prev: true,
      show_next: true
    };
  },
  computed: {
    steps() {
      const current_index = this.components_sequence.indexOf(
        this.current_component
      );
      const last_index = this.components_sequence.length;
      return `${current_index + 1}/${last_index}`;
    },
    current_component() {
      return this.components_sequence[this.index];
    }
  },
  mounted() {
    this.testStepperButtons();
  },
  methods: {
    ...mapActions(["addOverlayMessages"]),
    validate() {
      const current_component = this.$refs.current_component;
      return (
        !current_component.rules ||
        current_component.rules.every(rule => {
          return rule() === true;
        })
      );
    },
    validateBeforeNext() {
      const validate = this.validate()
      if (!validate) {
        const current_component = this.$refs.current_component;
        const rules_tests = current_component.rules.map(rule => rule());
        this.addOverlayMessages(rules_tests);
      }
      return validate
    },
    testStepperButtons() {
      this.showPrevButton();
      this.showNextButton();
    },
    showNextButton() {
      this.show_next = this.index !== this.components_sequence.length - 1;
    },
    showPrevButton() {
      this.show_prev = this.index > 0;
    },
    prevComponent() {
      this.index--;
    },
    nextComponent() {
      if (this.validateBeforeNext()) this.index++;
    }
  },
  watch: {
    index() {
      this.testStepperButtons();
    }
  }
};
</script>

<style>
</style>