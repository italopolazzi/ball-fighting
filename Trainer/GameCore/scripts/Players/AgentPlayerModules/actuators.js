import performMovements from '/GameCore/scripts/functions/performMovements.js'

import {
    TOP_FLAG,
    LEFT_FLAG,
    BOTTOM_FLAG,
    RIGHT_FLAG
} from "/GameCore/defaults/index.js"

const actuators = {
    chaseTheEffect() {
        const effect = this.environmentEffect()
        if (effect) this.move(effect)
    },
    chaseTheOpponent() {
        const opponent_character = this.opponent.character
        this.move(opponent_character)
    },
    runOfTheOpponent() {
        const opponent_character = this.opponent.character
        this.move(opponent_character, true)
    },
    move(element, runAway = false) {
        const movements_to_perform = []

        if (this.elementAtTop(element)) {
            movements_to_perform.push(runAway ? BOTTOM_FLAG : TOP_FLAG)
        }
        if (this.elementAtBottom(element)) {
            movements_to_perform.push(runAway ? TOP_FLAG : BOTTOM_FLAG)
        }
        if (this.elementAtLeft(element)) {
            movements_to_perform.push(runAway ? RIGHT_FLAG : LEFT_FLAG)
        }
        if (this.elementAtRight(element)) {
            movements_to_perform.push(runAway ? LEFT_FLAG : RIGHT_FLAG)
        }

        const character = this.character
        performMovements(character, movements_to_perform)
    }
}

export default actuators