import BattleOfflineSinglePlayer from "@/game/scripts/Battle/BattleOfflineSinglePlayer"
import AgentPlayer from "@/game/scripts/Players/AgentPlayer"
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"
// import loadAllCharacters from "@/game/scripts/functions/loadAllCharacters"
import loadGenomesPopulation from "@/game/scripts/functions/loadGenomesPopulation"
import BattleCanvas from "@/game/scripts/Canvas/BattleCanvas"

import Blue from "@/game/scripts/Characters/Blue"
import Red from "@/game/scripts/Characters/Red"

import { POPULATION_AMOUNT } from "@/game/defaults/defaults.js"

const loadRandomGenome = population_amount => {
    const genomes_population = loadGenomesPopulation(population_amount)
    const random_index = Math.floor(Math.random() * population_amount)
    return genomes_population[random_index]
}

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
            // const controls = rootGetters["launcher/getControls"]
            // const available_characters = loadAllCharacters()
            // const genomes_population = loadGenomesPopulation(POPULATION_AMOUNT)
            // commit("START_REGISTER", { controls, available_characters, genomes_population })
        },
        registerPlayer({ commit }, nickname) {
            // console.log(nickname);

            // if (nickname.length < 5) {
            //     return "Invalid length"
            // } else if (nickname === "teste") {
            //     return "Invalid nickname"
            // } else {
            //     commit("REGISTER_PLAYER", nickname)
            // }
        },
        startBattle({ commit, rootGetters, dispatch }, canvas_container_id) {
            // pre final validations
            if (true) {
                // just simulated values at first
                const battle_canvas = new BattleCanvas(canvas_container_id)


                // console.log(battle_canvas);

                const c1 = new Blue()
                c1.setInitialPositionAtCanvas(battle_canvas)
                const c2 = new Red()
                c2.setInitialPositionAtCanvas(battle_canvas)

                const player_1_controls = rootGetters["launcher/getControls"].client
                const player_2_controls = loadRandomGenome(POPULATION_AMOUNT)

                const p1 = new HumanPlayer(c1, player_1_controls)
                const p2 = new AgentPlayer(c2, player_2_controls)

                const battle = new BattleOfflineSinglePlayer([p1, p2], battle_canvas)

                commit("START_BATTLE", battle)
                dispatch("runningBattle")
            }
        },
        async runningBattle({ state, commit }) {
            const results = await state.battle.run()
            console.log(results);
            commit("SET_RESULTS", results)
        }
    },
    mutations: {
        START_REGISTER(state, { controls, available_characters, genomes_population }) {
            state.register.players.player_1.controls = controls.client
            state.register.available_characters = available_characters
        },
        REGISTER_PLAYER(state, nickname) {
            state.register.players.player_1.nickname = nickname
        },
        START_BATTLE(state, battle) {
            state.battle = battle
        },
        SET_RESULTS(state, results) {
            console.log(results);
            state.results = results
        }
    }
}