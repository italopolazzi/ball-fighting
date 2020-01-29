import BattleOfflineDualPlayer from "@/game/scripts/Battle/BattleOfflineDualPlayer"
import BattleCanvas from "@/game/scripts/Canvas/BattleCanvas"
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"

import characters from "@/game/scripts/objects/characters"

import { mapActions, mapGetters } from "vuex";

export default {
    namespaced: true,
    state: {
        battle: null,
        results: null
    },
    mutations: {
        SET_BATTLE(state, battle) {
            state.battle = battle
        }
    },
    actions: {
        createBattle({ commit, rootGetters, dispatch }, battle_container_id) {
            const getCharacterClass = (character_info, characters) => {
                return characters[character_info.name]
            }
            const register = rootGetters["register/dual/getState"]

            const { client, guest } = register.players

            const ClientCharacter = getCharacterClass(client.character, characters)
            const GuestCharacter = getCharacterClass(guest.character, characters)

            const client_controls = client.controls
            const guest_controls = guest.controls

            const canvas = new BattleCanvas(battle_container_id)

            const client_character = new ClientCharacter(canvas);
            const guest_character = new GuestCharacter(canvas);

            const client_player = new HumanPlayer(client_character, client_controls);
            const guest_player = new HumanPlayer(guest_character, guest_controls);

            const players = [client_player, guest_player]

            const battle = new BattleOfflineDualPlayer(players, canvas)
            commit("SET_BATTLE", battle)
            dispatch("startBattle")
        },
        async startBattle({ commit, state }) {
            const results = await state.battle.run()
            console.log({ results });
        }
    },
    getters: {
        getBattle: state => state.battle
    }
}