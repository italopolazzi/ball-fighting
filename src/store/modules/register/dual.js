import AgentPlayer from "@/game/scripts/Players/AgentPlayer"
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"

import characters from "@/game/scripts/objects/characters"

import { GAME_LEVELS } from "@/game/defaults/defaults"

export default {
    namespaced: true,
    state: {
        players: {
            client: {
                type: HumanPlayer,
                nickname: "tester1",
                controls: { top: "w", right: "d", bottom: "s", left: "a" },
                character: { name: "Yellow", color: "yellow", force: 3 }
            },
            guest: {
                type: HumanPlayer,
                nickname: "tester2",
                controls: { top: "ArrowUp", right: "ArrowRight", bottom: "ArrowDown", left: "ArrowLeft" },
                character: { name: "Indigo", color: "indigo", force: 3 }
            }
        },
        available_characters: Object.values(characters).map(c => c.info()),
        available_levels: GAME_LEVELS,
        available_genomes: null,
        choosed_level: null
    },
    mutations: {
        SET_CHARACTER_FOR_PLAYER(state, { player_key, character }) {
            state.players[player_key].character = character;
        },
        SET_NICKNAME_FOR_PLAYER(state, { player_key, nickname }) {
            state.players[player_key].nickname = nickname;
        },
        SET_CHOOSED_LEVEL(state, level) {
            state.choosed_level = level;
        },
        SET_CONTROLS_FOR_PLAYER(state, { player_key, controls }) {
            console.log({ player_key, controls });
            state.players[player_key].controls = controls;
        }
    },
    actions: {
        setCharacterForPlayer({ commit }, { player_key, character }) {
            commit("SET_CHARACTER_FOR_PLAYER", { player_key, character })
        },
        setNicknameForPlayer({ commit }, { player_key, nickname }) {
            commit("SET_NICKNAME_FOR_PLAYER", { player_key, nickname })
        },
        setChoosedLevel({ commit }, level) {
            commit("SET_CHOOSED_LEVEL", level)
        },
        setControlsForPlayer({ commit }, { player_key, controls }) {
            commit("SET_CONTROLS_FOR_PLAYER", { player_key, controls })
        },
    },
    getters: {
        getPlayersByType: state => class_type => {
            const players = state.players
            const filtered = Object.keys(players).reduce((acc, key) => {
                const player = players[key]
                if (player.type === class_type) acc[key] = player
                return acc
            }, {})
            return filtered
        },
        getHumanPlayers: (state, getters) => {
            return getters.getPlayersByType(HumanPlayer)
        },
        getAgentPlayers: (state, getters) => {
            return getters.getPlayersByType(AgentPlayer)
        },
        getPlayer: state => player_key => state.players[player_key],
        getPlayers: state => state.players,
        getState: state => state,
        getChoosedLevel: state => state.choosed_level,
        getAvailableCharacters: state => state.available_characters,
        getAvailableLevels: state => state.available_levels,
        getCharacters: state => {
            return Object.values(state.players).map(p => p.character);
        },
        getPlayerCharacter: state => player_key => {
            return state.players[player_key].character;
        },
        getNicknames: state => {
            return Object.values(state.players).map(p => p.nickname);
        }
    }
}