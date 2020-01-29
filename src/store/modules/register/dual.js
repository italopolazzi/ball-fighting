import AgentPlayer from "@/game/scripts/Players/AgentPlayer"
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"

import loadAllCharacters from "@/game/scripts/functions/loadAllCharacters"

import { GAME_LEVELS } from "@/game/defaults/defaults"

const all_characters = loadAllCharacters()

export default {
    namespaced: true,
    state: {
        players: {
            client: {
                type: HumanPlayer,
                nickname: "",
                controls: null,
                character: null
            },
            guest: {
                type: HumanPlayer,
                nickname: "",
                controls: null,
                character: null
            }
        },
        available_characters: all_characters.map(c => c.info()),
        available_levels: GAME_LEVELS,
        available_genomes: null,
        choosed_level: null
    },
    mutations: {
        SET_CHARACTER_FOR_PLAYER(state, { player_key, character }) {
            state.players[player_key].character = character;
            // console.log(state.players[player_key].character);
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
        getNicknames: state => {
            return Object.values(state.players).map(p => p.nickname);
        }
    }
}