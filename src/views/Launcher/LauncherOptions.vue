<template>
  <div class="launcher-options">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs4>
          <v-navigation-drawer permanent>
            <v-list nav dense>
              <v-list-item to="options-profile">
                <v-list-item-avatar>
                  <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="title ">Name</div>
                  <div class="subtitle">Lastname</div>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link to="options-controls">
                <v-list-item-icon>
                  <v-icon>mdi-google-controller</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Controls</v-list-item-title>
              </v-list-item>
              <v-list-item link to="options-display">
                <v-list-item-icon>
                  <v-icon>mdi-monitor-screenshot</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Display</v-list-item-title>
              </v-list-item>
              <v-list-item link to="options-language">
                <v-list-item-icon>
                  <v-icon>mdi-translate</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Language</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-flex>
        <v-flex xs8>
          <v-slide-x-transition mode="out-in" appear>
            <router-view />
          </v-slide-x-transition>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "launcher-options"
};
</script>

<style>
</style>