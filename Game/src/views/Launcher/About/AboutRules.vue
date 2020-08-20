<template>
  <div class="about-rules">
    <div class="title">Icons</div>
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

    <div class="title">Effects</div>
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
  </div>
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