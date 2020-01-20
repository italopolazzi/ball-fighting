import Vue from "vue";
import Vuex from "vuex";

import global from "./modules/global"
import launcher from "./modules/launcher"
import game from "./modules@/game"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { global, launcher, game }
});