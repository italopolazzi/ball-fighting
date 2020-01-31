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
        results: null
    },
    mutations: {
        SET_RESULTS(state, results) {
            state.results = results
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

            const canvas = new BattleCanvas(battle_container_id)

            const client_character = new ClientCharacter(canvas);
            const guest_character = new GuestCharacter(canvas);

            const client_player = new HumanPlayer(client_character, client.controls);
            const guest_player = new HumanPlayer(guest_character, guest.controls);

            const players = [client_player, guest_player]

            const battle = new BattleOfflineDualPlayer(players, canvas)

            dispatch("startBattle", battle)
        },
        async startBattle({ commit }, battle) {
            const results = await battle.run()
            commit("SET_RESULTS", results)
        }
    },
    getters: {
        getResults: state => state.results
    }
}