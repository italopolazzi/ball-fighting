<template>
  <div class="register-offline-dual">
    <v-btn @click="validate">Validate</v-btn>
    <v-btn @click="validateAll">Validate all</v-btn>
    <v-btn @click="play" :disabled="!valid">Play</v-btn>
    <v-stepper v-model="current_index" @change="validateAll">
      <!-- header -->
      <v-stepper-header>
        <template>
          <v-stepper-step
            v-for="(register, index) in registers"
            :key="index"
            :complete="valids[index]"
            editable
            :step="index"
            :alt-labels="true"
          >Step</v-stepper-step>
        </template>
      </v-stepper-header>
      <!-- content -->
      <v-stepper-content v-for="(register, index) in registers" :key="index" :step="index">
        <v-btn @click="prevStep">Prev</v-btn>
        <v-btn @click="nextStep">Next</v-btn>
        <component :is="register" :key="register.name" :ref="index" />
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import PlayersRegister from "@/components/Register/PlayersRegister";
import CharactersRegister from "@/components/Register/CharactersRegister";
import LevelsRegister from "@/components/Register/LevelsRegister";

import { mapGetters } from "vuex";
export default {
  name: "register-offline-dual",
  components: { PlayersRegister, CharactersRegister },
  computed: {
    ...mapGetters("register/dual", {}),
    current_component() {
      return this.registers[this.current_index];
    },
    valid() {
      return this.valids.every(i => !!i);
    }
  },
  data() {
    return {
      valids: null,
      current_index: 0,
      registers: [CharactersRegister, PlayersRegister, LevelsRegister]
    };
  },
  created() {
    this.valids = this.registers.map(reg => !reg);
  },
  methods: {
    play() {},
    nextStep() {
      this.validate();
      if (this.current_index === this.registers.length - 1) {
        this.current_index = 0;
      } else {
        this.current_index++;
      }
    },
    prevStep() {
      this.validate();
      if (this.current_index === 0) {
        this.current_index = this.registers.length - 1;
      } else {
        this.current_index--;
      }
    },
    validate() {
      const rules = this.$refs[this.current_index][0].rules;
      this.valids[this.current_index] = !rules || rules.every(r => r());
    },
    validateAll() {
      const refs = Object.values(this.$refs);
      const valids = refs.map(ref => {
        const rules = ref[0].rules;
        return !rules || rules.every(r => r());
      });
      this.valids = valids;
    }
  }
};
</script>

<style>
</style>