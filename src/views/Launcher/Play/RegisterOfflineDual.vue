<template>
  <div class="register-offline-dual">
    <v-stepper v-model="current_index" @change="validate">
      <v-stepper-header>
        <v-stepper-step
          v-for="(register, index) in registers"
          :key="index"
          :complete="valids[index]"
          editable
          :step="index"
        ></v-stepper-step>

      </v-stepper-header>

        {{current_component.name}}
      <v-stepper-content v-for="(register, index) in registers" :key="index" :step="index">
        <div><strong>Index:</strong> {{index}}</div>

        <div><strong>Valids:</strong> {{valids}}</div>

        <v-btn @click="prevStep">Prev</v-btn>
        <v-btn @click="nextStep">Next</v-btn>
        <component :is="current_component" :key="current_component.name" :ref="index" />
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import PlayersRegister from "@/components/Register/PlayersRegister";
import CharactersRegister from "@/components/Register/CharactersRegister";

import { mapGetters } from "vuex";
export default {
  name: "register-offline-dual",
  components: { PlayersRegister, CharactersRegister },
  computed: {
    ...mapGetters("register/dual", {}),
    current_component() {
      return this.registers[this.current_index];
    }
  },
  data() {
    return {
      valids: [],
      current_index: 0,
      registers: [CharactersRegister,PlayersRegister, CharactersRegister]
    };
  },
  created(){
    this.valids = this.registers.map(reg => !!reg)
  },
  methods: {
    nextStep() {
      if (this.current_index === this.registers.length - 1) {
        this.current_index = 0;
      } else {
        this.current_index++;
      }
      this.validate();
    },
    prevStep() {
      if (this.current_index === 0) {
        this.current_index = this.registers.length - 1;
      } else {
        this.current_index--;
      }
      this.validate();
    },
    validate() {
      const index = this.current_index;
      const rules = this.$refs[index][0].rules;
      this.valids[index] = !rules || rules.every(rule => rule());
    }
  }
};
</script>

<style>
</style>