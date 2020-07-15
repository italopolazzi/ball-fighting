import { CONTROLS } from "@/game/defaults/index.js"

export default {
    namespaced: true,
    state: {
        controls: {
            client: CONTROLS.CLIENT,
            guest: CONTROLS.GUEST,
        }
    },
    mutations: {},
    actions: {},
    getters: {
        getControls: state => state.controls,
        getClientControls: state => state.controls.client,
        getGuestControls: state => state.controls.guest,
        getPlayerControls: state => player_key => state.controls[player_key],
        getUsedKeys: state => {
            const keys = Object.values(state.controls)
                .reduce((acc, curr) => {
                    acc.push(...Object.values(curr))
                    return acc
                }, [])
            return keys
        }
    }
}