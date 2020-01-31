<template>
  <div class="register-offline-dual">
    <v-toolbar dense :color="color">
      <v-btn icon @click="prevStep">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn icon @click="nextStep">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="register" :disabled="!valid">Play</v-btn>
    </v-toolbar>
    <v-stepper v-model="current_index">
      <!-- header -->
      <v-stepper-header>
        <template v-for="(register, index) in registers">
          <v-stepper-step
            :key="index"
            :complete="valids[index]"
            editable
            :step="index + 1"
            :alt-labels="true"
          >
            <div class="text-capitalize">{{ stepLabel(register.name) }}</div>
          </v-stepper-step>
          <v-divider :key="register.name" v-if="index < Object.keys(registers).length - 1"></v-divider>
        </template>
      </v-stepper-header>
      <!-- content -->
      <v-stepper-content v-for="(register, index) in registers" :key="index" :step="index + 1">
        <component :is="register" :key="register.name" :ref="index" />
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import PlayersRegister from "@/components/Register/PlayersRegister";
import CharactersRegister from "@/components/Register/CharactersRegister";
import ControlersRegister from "@/components/Register/ControlersRegister";

import { mapGetters } from "vuex";
export default {
  name: "register-offline-dual",
  props: {
    color: {
      type: String,
      required: false
    }
  },
  components: {
    ControlersRegister,
    PlayersRegister,
    CharactersRegister
  },
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
      current_index: 1,
      registers: [ControlersRegister, CharactersRegister, PlayersRegister]
    };
  },
  mounted() {
    this.validateAll();
  },
  methods: {
    register() {
      this.$router.push({ name: "game-offline-dual" });
    },
    nextStep() {
      this.validateAll();
      if (this.current_index === this.registers.length) {
        this.current_index = 1;
      } else {
        this.current_index++;
      }
    },
    prevStep() {
      this.validateAll();
      if (this.current_index === 1) {
        this.current_index = this.registers.length;
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
