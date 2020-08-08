// classes battle
import BattleOfflineDualPlayer from "@/game/scripts/Battle/BattleOfflineDualPlayer"

// classes canvas
import BattleCanvas from "@/game/scripts/Canvas/BattleCanvas"

// classes players
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"

// objects
import characters from "@/game/scripts/objects/characters"

export default {
    namespaced: true,
    state: {
        battle: null,
        battle_results: null,
        canvas: null,
        players: {
            client: null,
            guest: null
        },
        controlers: {
            client: null,
            guest: null
        },
        characters: {
            client: null,
            guest: null
        },
        nicknames: {
            client: null,
            guest: null
        }
    },
    mutations: {
        SET_BATTLE_RESULTS(state, battle_results) {
            state.battle_results = battle_results
        },
        NEW_CANVAS(state, canvas_container) {
            state.canvas = new BattleCanvas(canvas_container)
        },
        NEW_CHARACTERS(state, register) {
            const getCharacterClass = (character_info, characters) => {
                return characters[character_info.name]
            }
            Object.keys(register.players).forEach(p_key => {
                const character_info = register.players[p_key].character
                const character_class = getCharacterClass(character_info, characters)
                state.characters[p_key] = new character_class(state.canvas)
            })
        },
        RESET_CHARACTERS(state) {
            Object.values(state.characters).forEach(c => {
                c.lifes = 3
                c.life_points = 100
            })
        },
        NEW_CONTROLERS(state, register) {
            Object.keys(register.players).forEach(p_key => {
                const controls = register.players[p_key].controls
                state.controlers[p_key] = controls
            })
        },
        NEW_NICKNAMES(state, register) {
            Object.keys(register.players).forEach(p_key => {
                const nickname = register.players[p_key].nickname
                state.nicknames[p_key] = nickname
            })
        },
        NEW_PLAYERS(state, register) {
            Object.keys(register.players).forEach(p_key => {
                const nickname = state.nicknames[p_key]
                const character = state.characters[p_key]
                const controls = state.controlers[p_key]
                state.players[p_key] = new HumanPlayer(character, controls, nickname)
            })
        },
        NEW_BATTLE(state) {
            state.battle_results = null
            state.battle = null
            const players = Object.values(state.players)
            const canvas = state.canvas
            state.battle = new BattleOfflineDualPlayer(players, canvas)
        }
    },
    actions: {
        playAgain({ commit, dispatch }) {
            commit("RESET_CHARACTERS")
            commit("NEW_BATTLE")
            dispatch("startBattle")
        },
        createBattle({ commit, rootGetters, dispatch }, canvas_container) {
            const register = rootGetters["register/dual/getState"]
            commit("NEW_CANVAS", canvas_container)
            commit("NEW_CHARACTERS", register)
            commit("NEW_CONTROLERS", register)
            commit("NEW_NICKNAMES", register)
            commit("NEW_PLAYERS", register)
            commit("NEW_BATTLE")

            dispatch("startBattle")
        },
        async startBattle({ commit, state }) {
            const battle_results = await state.battle.run()
            commit("SET_BATTLE_RESULTS", battle_results)
        }
    },
    getters: {
        getBattleResults: state => state.battle_results
    }
}