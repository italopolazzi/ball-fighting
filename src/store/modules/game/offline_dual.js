// components
import ControlsSelect from "@/components/Game/OfflineDual/ControlsSelect";
import PlayerRegister from "@/components/Game/OfflineDual/PlayerRegister";
import CharactersRegister from "@/components/Game/OfflineDual/CharactersRegister";
import MapChooser from "@/components/Game/OfflineDual/MapChooser";
import BattleCamp from "@/components/Game/OfflineDual/BattleCamp";

// modules
import players from './offline_dual/players'
import characters from './offline_dual/characters'
import battle from './offline_dual/battle'


export default {
    namespaced: true,
    modules: { players, characters, battle },
    state: {
        components_sequence: [
            ControlsSelect,
            PlayerRegister,
            CharactersRegister,
            MapChooser,
            BattleCamp,
        ],
        total_players: 2
    },
    getters: {
        getTotalPlayers: state => state.total_players,
        getComponentsSequence: state => state.components_sequence
    },
    actions: {

    },
    mutations: {

    }
}