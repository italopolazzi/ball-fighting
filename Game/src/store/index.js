import Vue from "vue";
import Vuex from "vuex";

import global from "@/store/modules/global"
import launcher from "@/store/modules/launcher"
import game from "@/store/modules/game"
import register from "@/store/modules/register"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {

    },
    mutations: {},
    actions: {},
    modules: { global, launcher, game, register }
});