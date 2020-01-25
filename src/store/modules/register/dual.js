import AgentPlayer from "@/game/scripts/Players/AgentPlayer"
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"

import loadAllCharacters from "@/game/scripts/functions/loadAllCharacters"

const all_characters = loadAllCharacters()

export default {
    namespaced: true,
    state: {
        players: {
            client: {
                type: HumanPlayer,
                nickname: "qwerty",
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
        genomes: null
    },
    mutations: {
        SET_CHARACTER(state, { player_key, character }) {
            state.players[player_key].character = character;
        }
    },
    actions: {
        setCharacterForPlayer({ commit }, { player_key, character }) {
            const characterDifferent = (character, characters) => {
                return !Object.values(characters).includes(character);
            };
            commit("SET_CHARACTER", { player_key, character })
        }
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
        getAvailableCharacters: state => state.available_characters,
        getCharacters: state => {
            return Object.values(state.players).map(p => p.character);
        }
    }
}