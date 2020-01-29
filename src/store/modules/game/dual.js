import { mapActions, mapGetters } from "vuex";

export default {
    namespaced: true,
    state: {
        battle: null
    },
    mutations: {},
    actions: {
        prepareForBattle({ commit, getters, rootGetters }, payload) {
            const getRegisterState = rootGetters["register/dual/getState"]
            console.log(getRegisterState);
            console.log(payload);
            console.log(getters.getGetters);


        },
    },
    getters: {
        getBattle: state => state.battle
    }
}