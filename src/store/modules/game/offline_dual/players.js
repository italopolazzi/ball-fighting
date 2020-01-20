import Player from "@/scripts/classes/Player"
import { players_defaults } from "@/scripts/defaults";

import { players } from "@/scripts/dev/objects"

class NickNameAlreadyExistsError extends Error {
    constructor(nick_name) {
        super(`A user with the nickname ${nick_name} already exists.`)
    }
}


export default {
    namespaced: true,
    state: {
        // players,
        players: {},
        rules: {
            nickRules: [v => !!v && v.length >= players_defaults.nick_name_mininum_length || players_defaults.nick_name_mininum_length_error_message]
        }
    },
    getters: {
        getNickRules: state => state.rules.nickRules,
        getPlayers: state => state.players
    },
    actions: {
        registerNewPlayer({ state, commit }, player) {
            if (Object.keys(state.players).includes(player.nick_name)) throw new NickNameAlreadyExistsError(player.nick_name)
            commit("NEW_PLAYER", player)
        },
        setCharactersForPlayers({ commit }, characters_instances) {
            Object.keys(characters_instances)
                .forEach(player_key => {
                    commit(
                        "SET_CHARACTER_FOR_PLAYER", { player_key, character: characters_instances[player_key] }
                    )
                })
        }
    },
    mutations: {
        NEW_PLAYER(state, player) {
            state.players[player.nick_name] = new Player(player.nick_name)
        },
        SET_CHARACTER_FOR_PLAYER(state, { player_key, character }) {
            state.players[player_key].includeCharacterAndSetItAsCurrent(character)
        }
    }
}