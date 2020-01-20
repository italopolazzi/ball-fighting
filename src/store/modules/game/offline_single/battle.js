import BattleOfflineSinglePlayer from "@/game/scripts/Battle/BattleOfflineSinglePlayer"

export default {
    namespaced: true,
    state: {
        instance: null,
        results: null
    },
    getters: {
        getBattleInstance: state => state.instance,
        getBattleResults: state => state.results
    },
    actions: {
        startBattle({ commit, dispatch, rootGetters }, canvas) {
            const players = rootGetters["game/offline_single/players/getPlayers"]

            commit("SET_BATTLE_INSTANCE", { players, canvas })
            dispatch("runningBattle")
        },
        resetBattle({ commit }) {
            commit("RESET_BATTLE")
        },
        async runningBattle({ state, commit }) {
            const results = await state.instance.run()
            commit("SET_BATTLE_RESULTS", results)
        }
    },
    mutations: {
        RESET_BATTLE(state) {
            state.instance = null
            state.results = null
        },
        SET_BATTLE_INSTANCE(state, { players, canvas }) {
            state.instance = new BattleOfflineSinglePlayer(players, canvas)
        },
        SET_BATTLE_RESULTS(state, results) {
            state.results = results
            state.instance = null
        }
    }
}