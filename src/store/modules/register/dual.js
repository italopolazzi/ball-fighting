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
                type: AgentPlayer,
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
            const players = Object.values(state.players)
            const filtered = players.filter(p => p.type === class_type)
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