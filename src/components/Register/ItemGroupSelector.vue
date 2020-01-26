<template>
  <div class="item-group-selector">
    {{value}}
    <v-item-group>
      <v-container fluid>
        <v-row no-gutters>
          <v-col v-for="(item, index) in items" :key="index">
            <v-item v-slot:default="{toggle}">
              <v-card
                @click="toggle(); emit(index)"
                :width="sizes.width"
                :height="sizes.height"
                :color="item.color"
              >
                <v-card-text>
                  <v-icon v-if="index === value">{{icon}}</v-icon>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <v-slide-y-transition mode="out-in">
      <div v-if="errors_messages" class="red--text">{{errors_messages}}</div>
    </v-slide-y-transition>
  </div>
</template>

<script>
export default {
  name: "item-group-selector",
  props: {
    rules: {
      type: Array,
      required: false
    },
    items: {
      type: [Object, Array],
      required: true
    },
    sizes: {
      type: Object,
      default: () => {
        return { width: 64, height: 64 };
      }
    },
    value: {
      type: [Number, Boolean],
      required: true
    }
  },
  computed: {
    icon() {
      return this.errors ? "mdi-cancel" : "mdi-check";
    },
    errors_messages() {
      if (this.errors) return this.errors[0];
      return null;
    },
    errors() {
      const { rules, value } = this;
      if (!rules) return false;
      const all_true = rules.every(r => r(value) === true);
      if (all_true) return false;
      const rules_mapped = rules.map(r => r(value));
      const strings = rules_mapped.filter(i => typeof i === "string");
      return strings;
    }
  },
  methods: {
    emit(index) {
      this.$emit("input", index);
    }
  }
};
</script>

<style>
</style>