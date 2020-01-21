import BattleOfflineSinglePlayer from "@/game/scripts/Battle/BattleOfflineSinglePlayer"
import AgentPlayer from "@/game/scripts/Players/AgentPlayer"
import HumanPlayer from "@/game/scripts/Players/HumanPlayer"
import loadAllCharacters from "@/game/scripts/functions/loadAllCharacters"
import loadPopulation from "@/game/scripts/functions/loadAllCharacters"
import BattleCanvas from "@/game/scripts/Canvas/BattleCanvas"

import {
    PLAYERS
} from "@/game/defaults/defaults.js"

export default {
    namespaced: true,
    state: {},
    getters: {},
    actions: {},
    mutations: {}
}




const offline_single_register = {
    players: {
        player_1: {
            character: "red",
            nickname: "qwerty",
            controls: PLAYERS.LEFT.CONTROLS
        },
        player_2: {
            character: "blue",
            nickname: "ytrewq",
            controls: "genome_level_easy"
        },
    },
    available_characters: loadAllCharacters()
}


// console.log(offline_single_register);
// offline_single_register.available_characters.forEach(ch => console.log(ch.info()))


const offline_dual_register = {
    players: {
        player_1: {
            character: "red",
            nickname: "qwerty",
            controls: PLAYERS.LEFT.CONTROLS
        },
        player_2: {
            character: "blue",
            nickname: "ytrewq",
            controls: "controls_player_2"
        },
    }
}