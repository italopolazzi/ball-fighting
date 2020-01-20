export default {
    namespaced: false,
    state: {
        overlay_messages: []
    },
    getters: {
        getOverlayMessages: state => state.overlay_messages
    },
    actions: {
        loadDefaults({ dispatch, commit }) {
            dispatch("game/loadGameDefaults")
        },
        addOverlayMessages({ commit }, payload) {
            commit("ADD_OVERLAY_MESSAGES", payload)
        },
        hideOverlayMessages({ commit }) {
            commit("CLEAR_OVERLAY_MESSAGE")
        }
    },
    mutations: {
        ADD_OVERLAY_MESSAGES(state, messages) {
            if (messages instanceof String) {
                state.overlay_messages.push(messages)
            } else if (messages instanceof Array) {
                messages = messages.filter(v => typeof v === "string")
                state.overlay_messages.push(...messages)
            }
        },
        CLEAR_OVERLAY_MESSAGE(state) {
            state.overlay_messages = []
        }
    }
}