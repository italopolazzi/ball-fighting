import { CONTROLS } from "@/game/defaults/defaults.js"

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
        getGuestControls: state => state.controls.guest
    }
}