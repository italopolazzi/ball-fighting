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
        battle_results: null,
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
        }
    },
    mutations: {
        SET_BATTLE_RESULTS(state, battle_results) {
            state.battle_results = battle_results
        }
    },
    actions: {
        createBattle({ commit, rootGetters, dispatch }, container) {
            const getCharacterClass = (character_info, characters) => {
                return characters[character_info.name]
            }
            const register = rootGetters["register/dual/getState"]
            const { client, guest } = register.players

            const ClientCharacter = getCharacterClass(client.character, characters)
            const GuestCharacter = getCharacterClass(guest.character, characters)

            const canvas = new BattleCanvas(container)

            const client_character = new ClientCharacter(canvas);
            const guest_character = new GuestCharacter(canvas);

            const client_player = new HumanPlayer(client_character, client.controls, client.nickname);
            const guest_player = new HumanPlayer(guest_character, guest.controls, guest.nickname);

            const players = [client_player, guest_player]

            const battle = new BattleOfflineDualPlayer(players, canvas)

            dispatch("startBattle", battle)
        },
        async startBattle({ commit }, battle) {
            const battle_results = await battle.run()
            commit("SET_BATTLE_RESULTS", battle_results)
        }
    },
    getters: {
        getBattleResults: state => state.battle_results
    }
}