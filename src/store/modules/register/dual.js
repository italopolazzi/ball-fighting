// classes players

import HumanPlayer from "@/game/scripts/Players/HumanPlayer"
// registers
import PlayersRegister from "@/components/Register/PlayersRegister";
import CharactersRegister from "@/components/Register/CharactersRegister";
import ControlersRegister from "@/components/Register/ControlersRegister";

// objects
import characters from "@/game/scripts/objects/characters"

export default {
    namespaced: true,
    state: {
        registers: [
            ControlersRegister, CharactersRegister, PlayersRegister
        ],
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
        },
        available_characters: Object.values(characters).map(c => c.info())
    },
    mutations: {
        SET_CHARACTER_FOR_PLAYER(state, { player_key, character }) {
            state.players[player_key].character = character;
        },
        SET_NICKNAME_FOR_PLAYER(state, { player_key, nickname }) {
            state.players[player_key].nickname = nickname;
        },
        SET_CONTROLS_FOR_PLAYER(state, { player_key, controls }) {
            console.log({ player_key, controls });
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
        getPlayer: state => player_key => state.players[player_key],
        getPlayers: state => state.players,
        getState: state => state,
        getAvailableCharacters: state => state.available_characters,
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