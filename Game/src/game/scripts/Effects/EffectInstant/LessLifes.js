import EffectInstant from "@/game/scripts/Effects/EffectInstant.js";

import { EFFECTS } from "@/game/defaults/index.js"

class LessLifes extends EffectInstant {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.BAD_TO_COLLECT]
        this.power = EFFECTS.CLASSES.INSTANT.LESS_LIFES.POWER
        this.color = EFFECTS.CLASSES.INSTANT.LESS_LIFES.COLOR
    }

    mod() {
        this.character_owner.decrementLifes(EFFECTS.CLASSES.INSTANT.LESS_LIFES.DECREMENT_LIFES)
    }

    static info() {
        return {
            name: "LessLifes",
            color: EFFECTS.CLASSES.INSTANT.LESS_LIFES.COLOR,
            description: "Removes a certain number of lives from the character",
            super_class: "EffectInstant"
        }
    }
}

export default LessLifes