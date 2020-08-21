<template>
 <v-container>
    <div class="about-rules">
    <h1 class="display-2">Game rules and details</h1>

    <section>
      <h2 class="display-1 mt-8">About</h2>
      <p>A game developed in JavaScript, Vue.js and Vuetify, in which two characters must compete to win the battle.</p>

      <h3>How to play?</h3>
      <p>Two characters with the same amount of health are placed at the ends of the canvas, the player must use the arrow keys to start the movement of his character. But beware! Take it easy. The characters should not attack each other initially, as they will lose the same amount of life when they collide with each other, which would result in a draw after the exhaustion of the 3 lives that accompany each one.</p>

      <h3>Okay, so what's the point?</h3>
      <p>For there to be a winner (and consequently a loser), they must collect effects that will appear at random times and positions within the field. the effects can be positive for the character or not. Among them there are some subcategories, each with its peculiarity, added to give dynamics to the battles.</p>

      <h3>Who controls the opponent?</h3>
      <p>
        Two game modes have been created:
      </p>
      <ul>
        <li>a player versus the machine (using genetic algorithms)</li>
        <li>two players sharing the same screen and keyboard</li>
      </ul>

      <aside class="mt-8 caption red--text">This is a beta version, some interface and gameplay details still need to be fixed.</aside>
    </section>

    <section>
      <h2 class="display-1 mt-8">Icons</h2>
      <v-row>
        <v-col :cols="3" v-for="(icon, icon_key) in icons" :key="icon_key">
          <v-card class="fill-height">
            <v-avatar>
              <v-icon>{{icon.type}}</v-icon>
            </v-avatar>
            <v-card-text>{{icon.title}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <section>
      <h2 class="display-1 mt-8">Effects</h2>
      <h3 class="title mt-8">Abstract types</h3>
      <v-row>
        <ul>
          <li>Infectious: are applied immediately after being collected and can be replicated on the opponent in the character collision, the effect is canceled after a certain period of time</li>
          <li>Timeout: applied immediately after being collected and make changes to the collector given a specific period of time</li>
          <li>Cancelable: does not affect the character, only removes the current effect if it exists</li>
          <li>Instant: effects of these classes are applied immediately after being collected and make changes to the collector only once</li>
          <li>Transferable: not applied immediately after being collected, the character who collects an effect from this class needs to collide with the opponent to transfer the effect to this opponent</li>
          <li>Counter: are applied immediately and modify the host character a certain number of times</li>
        </ul>
      </v-row>

      <h3 class="title mt-8">Extended types</h3>
      <v-row>
        <v-col
          :cols="3"
          v-for="(super_class, super_class_key) in super_classes"
          :key="super_class_key"
          class="d-flex align-stretch"
        >
          <v-card flat color="transparent">
            <v-card-title :key="super_class_key">{{ super_class_key | effect }}</v-card-title>

            <v-card-text>
              <v-card class="my-4" v-for="(item, item_key) in super_class" :key="item_key">
                <v-avatar :color="item.color"></v-avatar>
                <v-card-text>
                  <div class="title">{{item.name}}</div>
                  <div class="body-1">{{item.description}}</div>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <footer class="text-center">
      Made with love by Ítalo Polazzi
    </footer>
  </div>
 </v-container>
</template>

<script>
import loadAllEffects from "@/game/scripts/functions/loadAllEffects";

const effects = loadAllEffects();

const effects_reduced = effects.reduce((acc, curr) => {
  const info = curr.info();
  const super_class = info.super_class;
  if (!acc.hasOwnProperty(super_class)) {
    acc[super_class] = [];
  }
  acc[super_class].push(info);
  return acc;
}, {});

export default {
  name: "about-rules",
  filters: {
    effect(v) {
      return v.split("Effect")[1];
    },
  },
  data() {
    return {
      super_classes: effects_reduced,
      icons: [
        {
          type: "mdi-emoticon",
          title: "Represents a player and the choosed character color",
        },
        {
          type: "mdi-robot",
          title: "Represents a agent player and the choosed character color",
        },
        { type: "mdi-heart", title: "Represents characters' lifes" },
        {
          type: "mdi-heart-broken",
          title: "Represents characters' dead lifes",
        },
        {
          type: "mdi-flask",
          title:
            "Represents if the character has an effect and the color of the current effect",
        },
        { type: "mdi-flask-empty-outline", title: "Means no character effect" },
        {
          type: "mdi-emoticon-cool",
          title:
            "Appears together with the number of the player's winner battles",
        },
        {
          type: "mdi-emoticon-neutral",
          title:
            "Appears together with the number of the player's tied battles",
        },
        {
          type: "mdi-emoticon-dead",
          title:
            "Appears together with the number of the player's losed battles",
        },
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
// .about-rules
//   overflow-y: scroll
</style>