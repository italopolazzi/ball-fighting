import Battle from "./Battle.js";

import { dualPlayerMovementEngine } from "@/game/scripts/engines/engines.js"


class BattleOfflineDualPlayer extends Battle {
    constructor(players, canvas) {
        super(players, canvas)
    }

    listenForPlayerControls() {
        dualPlayerMovementEngine(this.players)
    }
}


export default BattleOfflineDualPlayer