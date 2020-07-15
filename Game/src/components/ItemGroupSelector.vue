<template>
  <div class="item-group-selector">
    <v-item-group>
      <v-container fluid>
        <v-row>
          <v-col v-for="(available_item, item_index) in available_items" :key="item_index">
            <v-item v-slot:default="{toggle}">
              <v-card
                :disabled="isSelectedIndex(item_index)"
                @click="emit(available_item, toggle)"
                :width="sizes.width"
                :height="sizes.height"
                :color="available_item.color"
                class="circle"
              >
                <v-card-text>
                  <v-icon v-for="(icon,icon_index) in indexes" :key="icon_index" class="text_2rem">
                    <template v-if="indexes[icon_index] === item_index">mdi-numeric-{{icon_index+1}}</template>
                  </v-icon>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
export default {
  name: "item-group-selector",
  props: {
    available_items: {
      type: [Object, Array],
      required: true
    },
    selected_items: {
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
      required: true
    }
  },
  computed: {
    indexes() {
      return this.selectedEquivalentIndexes();
    }
  },
  methods: {
    emit(item, toggle) {
      this.$emit("input", item);
      toggle();
    },
    isEquivalent(a, b) {
      if (!a) return false;
      if (!b) return false;
      const aProps = Object.getOwnPropertyNames(a);
      const bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];
        if (a[propName] !== b[propName]) {
          return false;
        }
      }
      return true;
    },
    selectedEquivalentIndexes() {
      Array.prototype.indexOfEquivalent = function(v, isEquivalent) {
        for (let i = 0; i < this.length; i++) {
          const element = this[i];
          if (isEquivalent(v, element) || v === element) return i;
        }
        return -1;
      };
      const { isEquivalent, available_items, selected_items } = this;
      const indexes = [];
      for (let i = 0; i < selected_items.length; i++) {
        const element = selected_items[i];
        const index = available_items.indexOfEquivalent(element, isEquivalent);
        indexes.push(index);
      }
      return indexes;
    },
    isSelectedIndex(index) {
      return this.indexes.includes(index);
    }
  }
};
</script>

<style scoped>
.text_2rem {
  font-size: 2rem;
}
.circle {
  border-radius: 50% !important;
}
</style>