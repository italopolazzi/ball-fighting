<template>
  <div class="keys-selector">
    <!-- ini keys-selector -->

    <!-- 1st row -->
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <KeyButtonSelector
          :icon="'mdi-arrow-up'"
          :direction="'top'"
          :method="changeKey"
          :keys="keys"
          :changing_message="changing_message"
          :changing_message_color="changing_message_color"
        />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <!-- 2nd row -->
    <v-row>
      <v-col>
        <KeyButtonSelector
          :icon="'mdi-arrow-left'"
          :direction="'left'"
          :method="changeKey"
          :keys="keys"
          :changing_message="changing_message"
          :changing_message_color="changing_message_color"
        />
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <KeyButtonSelector
          :icon="'mdi-arrow-right'"
          :direction="'right'"
          :method="changeKey"
          :keys="keys"
          :changing_message="changing_message"
          :changing_message_color="changing_message_color"
        />
      </v-col>
    </v-row>

    <!-- 3rd row -->
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <KeyButtonSelector
          :icon="'mdi-arrow-down'"
          :direction="'bottom'"
          :method="changeKey"
          :keys="keys"
          :changing_message="changing_message"
          :changing_message_color="changing_message_color"
        />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <!-- end keys-selector -->
    <div v-if="error_message" class="red--text">{{error_message}}</div>
  </div>
</template>

<script>
import KeyButtonSelector from "@/components/KeyButtonSelector";
export default {
  name: "keys-selector",
  components: { KeyButtonSelector },
  props: {
    value: {
      type: Object,
      required: true
    },
    used_keys: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      keys: {},
      error_message: null,
      changing_message: "...",
      changing_message_color: "primary",
      result: null
    };
  },
  created() {
    this.keys = this.value;
  },
  methods: {
    changeKey(direction) {
      const keys = this.keys;
      const used_keys = this.used_keys;
      const initial_key = keys[direction];
      this.keys[direction] = null;

      const keyIsNotUsed = (key, used_keys) => {
        return !used_keys.includes(key);
      };

      const changer = event => {
        const key = event.key;

        if (keyIsNotUsed(key, used_keys)) {
          this.keys[direction] = key;
          this.error_message = null;
        } else {
          this.keys[direction] = initial_key;
          this.error_message = "Key already in use";
        }

        window.removeEventListener("keydown", changer);
      };

      window.addEventListener("keydown", changer);
    },
    validateKeys() {
      return Object.values(this.keys).every(v => !!v);
    }
  },
  watch: {
    keys: {
      deep: true,
      handler(val) {
        if (this.validateKeys()) {
          this.$emit("input", val);
        }
      }
    }
  }
};
</script>

<style>
</style>