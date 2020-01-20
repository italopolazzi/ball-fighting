import { characters_defaults } from '@/scripts/defaults'
import allCharactersClasses from "@/scripts/objects/allCharactersClasses"

export default {
    namespaced: true,
    state: {
        choosed_characters: {},
        available_characters: {
            ...characters_defaults
        }
    },
    getters: {
        getAvailableCharacters: state => state.available_characters,
        getChoosedCharacters: state => state.choosed_characters
    },
    actions: {
        chooseCharacter({ commit }, vm) {
            commit("CHOOSE_CHARACTER", vm)
        },
        instantiateCharacters({ state, dispatch }) {
            const characters_instances = Object.keys(state.choosed_characters)
                .reduce((acc, player_key) => {
                    const character_raw = state.choosed_characters[player_key]
                    const classe = allCharactersClasses[character_raw.name]
                    acc[player_key] = new classe()
                    return acc
                }, {})
            dispatch(
                "game/offline_dual/players/setCharactersForPlayers",
                characters_instances, { root: true }
            )
        }
    },
    mutations: {
        CHOOSE_CHARACTER(state, vm) {
            const { player_key, character } = vm.$props
            vm.$set(state.choosed_characters, player_key, character)
        }
    }
}