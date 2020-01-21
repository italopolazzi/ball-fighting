<template>
  <div class="play">
    <v-container fluid>
      <v-layout row nowrap>


        <!-- game-offline-single -->
        <v-flex xs3>
          <v-card outlined color="green lighten-2" :to="{name: 'game-offline-single', params: {start: true}}">
            <v-list-item two-line>
              <v-list-item-content>
                <div class="overline">just you and the machine</div>
                <div class="title">Offline single</div>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, illum! Eos, nesciunt delectus? Et similique alias consectetur recusandae a, beatae accusantium eligendi maiores saepe? Voluptate nam consequuntur delectus impedit dolore?</v-card-text>
          </v-card>
        </v-flex>
        <!-- game-offline-dual -->
        <v-flex xs3>
          <v-card outlined color="blue lighten-2" :to="{name: 'game-offline-dual', params: {start: true}}">
            <v-list-item two-line>
              <v-list-item-content>
                <div class="overline">share the screen with a friend</div>
                <div class="title">Offline dual</div>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, illum! Eos, nesciunt delectus? Et similique alias consectetur recusandae a, beatae accusantium eligendi maiores saepe? Voluptate nam consequuntur delectus impedit dolore?</v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default { name: "play" };
</script>

<style>
</style>