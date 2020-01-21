import BattleOfflineSinglePlayer from "@/game/scripts/Battle/BattleOfflineSinglePlayer"
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"
import loadAllCharacters from "@/game/scripts/functions/loadAllCharacters"
import BattleCanvas from "@/game/scripts/Canvas/BattleCanvas"

export default {
    namespaced: true,
    state: {
        register: {
            players: {
                player_1: {
                    character: null,
                    nickname: null,
                    controls: null
                },
                player_2: {
                    character: null,
                    nickname: null,
                    controls: null
                },
            },
            available_characters: null
        }
    },
    getters: {},
    actions: {
        startRegister({ commit, rootGetters }) {
            const controls = rootGetters["launcher/getControls"]
            const available_characters = loadAllCharacters()
            commit("START_REGISTER", { controls, available_characters })
        },
        registerPlayer({ commit }) {
            console.log("registrado pelo dual");

        }
    },
    mutations: {
        START_REGISTER(state, { controls, available_characters }) {
            state.register.players.player_1.controls = controls.client
            state.register.players.player_2.controls = controls.guest
            state.register.available_characters = available_characters
        }
    }
}