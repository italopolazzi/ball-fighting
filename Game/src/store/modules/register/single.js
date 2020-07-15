// classes register
import PlayersRegister from "@/components/Register/PlayersRegister";
import CharactersRegister from "@/components/Register/CharactersRegister";
import ControlersRegister from "@/components/Register/ControlersRegister";
import LevelsRegister from "@/components/Register/LevelsRegister";

// classes players
import AgentPlayer from "@/game/scripts/Players/AgentPlayer"
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"

// objects
import characters from "@/game/scripts/objects/characters"

// functions
import loadGenomesPopulation from "@/game/scripts/functions/loadGenomesPopulation"

// constants
import { GAME_LEVELS, POPULATION_AMOUNT } from "@/game/defaults/index"

export default {
    namespaced: true,
    state: {
        registers: [
            LevelsRegister, ControlersRegister, CharactersRegister, PlayersRegister
        ],
        players: {
            client: {
                type: HumanPlayer,
                nickname: "tester1",
                controls: { top: "w", right: "d", bottom: "s", left: "a" },
                character: { name: "Yellow", color: "yellow", force: 3 }
            },
            agent: {
                type: AgentPlayer,
                nickname: "tester2",
                controls: null,
                character: { name: "Indigo", color: "indigo", force: 3 }
            }
        },
        available_characters: Object.values(characters).map(c => c.info()),
        available_levels: GAME_LEVELS,
        available_genomes: loadGenomesPopulation(POPULATION_AMOUNT),
        choosed_level: 1
    },
    mutations: {
        SET_CHARACTER_FOR_PLAYER(state, { player_key, character }) {
            state.players[player_key].character = character;
        },
        SET_NICKNAME_FOR_PLAYER(state, { player_key, nickname }) {
            state.players[player_key].nickname = nickname;
        },
        SET_CHOOSED_LEVEL(state, level) {
            state.choosed_level = level;
        },
        SET_CONTROLS_FOR_PLAYER(state, { player_key, controls }) {
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
        setChoosedLevel({ commit, state }, level) {
            const random_genome_index = Math.floor(Math.random() * POPULATION_AMOUNT)
            const random_genome = state.available_genomes[random_genome_index]

            Object.keys(state.players).forEach(player_key => {
                const player = state.players[player_key]
                const controls = random_genome
                if (player.type === AgentPlayer) {
                    commit("SET_CONTROLS_FOR_PLAYER", { player_key, controls })
                }
            })
            commit("SET_CHOOSED_LEVEL", level)
        },
        setControlsForPlayer({ commit }, { player_key, controls }) {
            commit("SET_CONTROLS_FOR_PLAYER", { player_key, controls })
        },
    },
    getters: {
        getRegisters: state => state.registers,
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
        getAvailableGenomes: state => state.available_genomes,
        getCharacters: state => {
            return Object.values(state.players).map(p => p.character);
        },
        getPlayerCharacter: state => player_key => {
            return state.players[player_key].character;
        },
        getNicknames: state => {
            return Object.values(state.players).map(p => p.nickname);
        }
    }
}