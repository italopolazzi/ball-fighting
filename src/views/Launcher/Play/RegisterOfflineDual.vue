<template>
  <div class="register-offline-dual">
    <v-btn @click="validateAll">Validate all</v-btn>
    <v-btn @click="play" :disabled="!valid">Play</v-btn>
    {{valids}}
    {{valid}}
    <v-card>
      <v-card-text>{{state}}</v-card-text>
    </v-card>
    <v-stepper v-model="current_index" @change="validateAll">
      <!-- header -->
      <v-stepper-header>
        <template v-for="(register, index) in registers">
          <v-stepper-step :key="index" :complete="valids[index]" :step="index" :alt-labels="true">
            <div class="text-capitalize">{{stepLabel(register.name)}}</div>
          </v-stepper-step>
          <v-divider :key="register.name" v-if="index < Object.keys(registers).length-1"></v-divider>
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
    ...mapGetters("register/dual", { state: "getState" }),
    current_component() {
      return this.registers[this.current_index];
    },
    valid() {
      return this.valids.every(i => !!i);
    }
  },
  data() {
    return {
      valids: [],
      current_index: 0,
      registers: [CharactersRegister, LevelsRegister, PlayersRegister]
    };
  },
  mounted() {
    this.validateAll();
  },
  methods: {
    play() {},
    nextStep() {
      this.validateAll();
      if (this.current_index === this.registers.length - 1) {
        this.current_index = 0;
      } else {
        this.current_index++;
      }
    },
    prevStep() {
      this.validateAll();
      if (this.current_index === 0) {
        this.current_index = this.registers.length - 1;
      } else {
        this.current_index--;
      }
    },
    validateAll() {
      const refs = Object.values(this.$refs);
      const valids = refs.map(ref => {
        const rules = ref[0].rules;
        return !rules || rules.every(r => r());
      });
      console.log(valids);

      this.valids = valids;
    },
    stepLabel(register_name) {
      return register_name.split("-register")[0];
    }
  },
  watch: {
    state: {
      deep: true,
      handler(val, old) {
        if (val !== old) {
          this.validateAll();
        }
      }
    }
  }
};
</script>

<style>
</style>