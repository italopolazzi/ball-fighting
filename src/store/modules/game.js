const controls = {
    players: {
        client_player: { top: 'w', left: 'a', bottom: 's', right: 'd' },
        guest_player: { top: 'ArrowUp', left: 'ArrowLeft', bottom: 'ArrowDown', right: 'ArrowRight' }
    }
}

import online_remote from '.@/game/online_remote'
import online_local from '.@/game/online_local'
import offline_single from '.@/game/offline_single'
import offline_dual from '.@/game/offline_dual'

export default {
    namespaced: true,
    modules: { online_remote, offline_single, online_local, offline_dual },
    state: {
        options: {
            controls: {
                players: {
                    client_player: null,
                    guest_player: null
                }
            }
        }
    },
    getters: {
        getControlsForClientPlayer: state => state.options.controls.players.client_player,
        getControlsForGuestPlayer: state => state.options.controls.players.guest_player,
        getControlsForPlayers: state => state.options.controls.players,
        validNewKey: state => key => {
            const all_keys = Object.values(state.options.controls.players)
                .reduce((acc, curr) => {
                    const controls = curr
                    acc.push(...Object.values(controls))
                    return acc
                }, [])
            return !all_keys.includes(key)
        }
    },
    actions: {
        loadGameDefaults({ commit }) {
            commit(`DEFAULTS_CLIENT_PLAYER`)
            commit(`DEFAULTS_GUEST_PLAYER`)
        },
        changePlayerControls({ commit }, { player_key, keys }) {
            if (player_key === "client_player") {
                commit("SET_CONTROLS_CLIENT_PLAYER", keys)
            } else {
                commit("SET_CONTROLS_GUEST_PLAYER", keys)
            }
        },
        restoreDefaults({ commit }, { player_key }) {
            if (player_key === "client_player") {
                commit("DEFAULTS_CLIENT_PLAYER", keys)
            } else {
                commit("DEFAULTS_GUEST_PLAYER", keys)
            }
        }
    },
    mutations: {
        SET_CONTROLS_CLIENT_PLAYER(state, keys) {
            state.options.controls.players['client_player'] = keys
        },
        SET_CONTROLS_GUEST_PLAYER(state, keys) {
            state.options.controls.players['guest_player'] = keys
        },
        DEFAULTS_CLIENT_PLAYER(state) {
            state.options.controls.players['client_player'] = {...controls.players.client_player }
        },
        DEFAULTS_GUEST_PLAYER(state) {
            state.options.controls.players['guest_player'] = {...controls.players.guest_player }
        }
    }
}