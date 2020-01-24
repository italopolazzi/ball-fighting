<template>
  <div class="play">
    <v-container fluid>
      <v-item-group>
        <v-row wrap>
          <v-col v-for="item in items" :key="item">
            <v-item v-slot:default="{active, toggle}">
              <v-card @click="toggle" :to="item.to" :color="active ? '' : item.color">
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
    </v-container>
    <router-view />
  </div>
</template>



<script>
export default {
  name: "play",
  data() {
    return {
      items: [
        {
          overline: "play with the machine",
          title: "Offline single",
          color: "green",
          to: { name: "register-offline-single" }
        },
        {
          overline: "share the keyborad and screen with a friend",
          title: "Offline dual",
          color: "blue",
          to: { name: "register-offline-dual" }
        }
      ]
    };
  }
};
</script>

<style>
</style>