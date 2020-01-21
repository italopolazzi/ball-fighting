import BattleOfflineSinglePlayer from "@/game/scripts/Battle/BattleOfflineSinglePlayer"
import AgentPlayer from "@/game/scripts/Players/AgentPlayer"
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"
import loadAllCharacters from "@/game/scripts/functions/loadAllCharacters"
import loadGenomesPopulation from "@/game/scripts/functions/loadGenomesPopulation"
import BattleCanvas from "@/game/scripts/Canvas/BattleCanvas"

import { POPULATION_AMOUNT } from "@/game/defaults/defaults.js"

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
            available_characters: null,
            genomes_population: null
        }
    },
    getters: {},
    actions: {
        startRegister({ commit, rootGetters }) {
            const controls = rootGetters["launcher/getControls"]
            const available_characters = loadAllCharacters()
            const genomes_population = loadGenomesPopulation(POPULATION_AMOUNT)
            commit("START_REGISTER", { controls, available_characters, genomes_population })
        },
        registerPlayer({ commit }) {
            console.log("registrado pelo single");

        }
    },
    mutations: {
        START_REGISTER(state, { controls, available_characters, genomes_population }) {

            state.register.players.player_1.controls = controls.client
            state.register.available_characters = available_characters

        }
    }
}