import Player from './Player.js'

import { singlePlayerMovementEngine } from "@/game/scripts/engines/engines.js"

import { PLAYERS } from "@/game/defaults/index.js"

class HumanPlayer extends Player {
    constructor(character, controls, nickname = "human_player") {
        super(character, nickname)
        this.original_controls = controls
        this.controls = this.original_controls
        character.movement_speed = PLAYERS.HUMAN.CHARACTER.SPEED
    }

    resetControls() {
        this.controls = this.original_controls
    }

    setControls(controls) {
        this.controls = controls
    }

    requireAction() {
        singlePlayerMovementEngine(this)
    }
}


export default HumanPlayer