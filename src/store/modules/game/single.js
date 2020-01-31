// classes battle
import BattleOfflineSinglePlayer from "@/game/scripts/Battle/BattleOfflineSinglePlayer"

// classes canvas
import BattleCanvas from "@/game/scripts/Canvas/BattleCanvas"

// classes players
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"
import AgentPlayer from "@/game/scripts/Players/AgentPlayer"

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
            const register = rootGetters["register/single/getState"]
            const { client, agent } = register.players

            const ClientCharacter = getCharacterClass(client.character, characters)
            const AgentCharacter = getCharacterClass(agent.character, characters)

            const canvas = new BattleCanvas(battle_container_id)

            const client_character = new ClientCharacter(canvas);
            const agent_character = new AgentCharacter(canvas);

            const client_player = new HumanPlayer(client_character, client.controls);
            const agent_player = new AgentPlayer(agent_character, agent.controls);

            const players = [client_player, agent_player]

            const battle = new BattleOfflineSinglePlayer(players, canvas)

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