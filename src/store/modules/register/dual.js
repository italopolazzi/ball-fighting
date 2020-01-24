import AgentPlayer from "@/game/scripts/Players/AgentPlayer"
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"

export default {
    namespaced: true,
    state: {
        players: {
            client: {
                type: HumanPlayer,
                nickname: null,
                controls: null,
                character: null
            },
            guest: {
                type: HumanPlayer,
                nickname: null,
                controls: null,
                character: null
            }
        },
        characters: null,
        genomes: null
    },
    mutations: {},
    actions: {},
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
        }
    }
}