<template>
  <div class="launcher-register">
    <v-container fluid>
      <v-row>
        <!-- item-group -->
        <v-col cols="12" md="6">
          <v-item-group>
            <v-row wrap v-for="(item, key) in items" :key="key">
              <v-col>
                <v-item v-slot:default="{active, toggle}">
                  <v-card
                    @click="toggle(); setCurrentItem(item)"
                    :to="item.to"
                    :color="active ? '' : item.color"
                  >
                    <v-list-item two-line>
                      <v-list-item-content>
                        <div class="overline mb-4">{{item.overline}}</div>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
        </v-col>

        <!-- router-view -->
        <v-col cols="12" md="6">
          <v-slide-y-transition mode="out-in" appear>
            <router-view :key="$route.params.namespace" />
          </v-slide-y-transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script>
export default {
  name: "launcher-register",
  data() {
    return {
      current_item: {},
      items: [
        {
          overline: "play with the machine",
          title: "Offline single",
          color: "green",
          to: { name: "register-offline", params: { namespace: "single" } }
        },
        {
          overline: "share the keyborad and screen with a friend",
          title: "Offline dual",
          color: "yellow",
          to: { name: "register-offline", params: { namespace: "dual" } }
        }
      ]
    };
  },
  methods: {
    setCurrentItem(item) {
      this.current_item = item;
    }
  }
};
</script>

<style>
</style>