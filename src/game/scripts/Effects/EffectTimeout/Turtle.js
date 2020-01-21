import EffectTimeout from "@/game/scripts/Effects/EffectTimeout.js";

import { EFFECTS } from "@/game/defaults/defaults.js"

class Turtle extends EffectTimeout {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.BAD_TO_COLLECT, EFFECTS.TYPES.BAD_TO_ATTACK]
        this.power = EFFECTS.CLASSES.TIMEOUT.TURTLE.POWER
        this.color = EFFECTS.CLASSES.TIMEOUT.TURTLE.COLOR
    }

    beforeMod() {
        this.save = this.character_owner.movement_speed
    }

    mod() {
        const percent = EFFECTS.CLASSES.TIMEOUT.TURTLE.SPEED_PERCENT
        this.character_owner.movement_speed *= percent
    }

    beforeDestroy() {
        this.character_owner.movement_speed = this.save
    }
}

export default Turtle