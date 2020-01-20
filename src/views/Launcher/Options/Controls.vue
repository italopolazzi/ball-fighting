<template>
  <div class="options-controls">
    <!-- ini Game online, offline and network -->
    <v-container fluid>
      <div class="display-1 mb-5">Game online, offline and network</div>
      <v-layout row wrap>
        <v-flex xs4>
          <v-card>
            <v-card-title>Keyboard</v-card-title>
            <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem illum harum corrupti blanditiis rem atque! Esse, expedita nobis dolorum qui, porro inventore, exercitationem voluptatibus ullam voluptatem a quibusdam ipsum nesciunt!</v-card-text>
            <v-card-actions>
              <v-btn>Use</v-btn>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" fullscreen>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-settings</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>Select your keys</v-card-title>

                  <v-card-text>
                    <KeyChanger/>
                    <KeyChanger :player_key="'guest_player'" />
                    <!-- <KeyChanger :player_position="3" /> -->
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card>
            <v-card-title>Joystick</v-card-title>
            <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem illum harum corrupti blanditiis rem atque! Esse, expedita nobis dolorum qui, porro inventore, exercitationem voluptatibus ullam voluptatem a quibusdam ipsum nesciunt!</v-card-text>
            <v-card-actions>
              <v-btn>Use</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card>
            <v-card-title>Mouse</v-card-title>
            <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem illum harum corrupti blanditiis rem atque! Esse, expedita nobis dolorum qui, porro inventore, exercitationem voluptatibus ullam voluptatem a quibusdam ipsum nesciunt!</v-card-text>
            <v-card-actions>
              <v-btn>Use</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- end Game online, offline and network -->

    <!-- ini Game multiplayer local -->
    <v-container fluid>
      <div class="display-1 mb-5">Game multiplayer local</div>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title>Keyboard</v-card-title>
            <v-card-text>You and your friend will play using the same screen and keyboard. Set up your favorite key combination for each of you.</v-card-text>
            <v-card-actions>
              <v-btn>Use</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-settings</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- end Game multiplayer local -->
  </div>
</template>

<script>
import KeyChanger from '@/components/Launcher/Options/Controls/KeyChanger'
export default {
  name: "options-controls",
  components:{KeyChanger},
  data() {
    return {
      dialog: true
    };
  }
};
</script>

<style>
</style>