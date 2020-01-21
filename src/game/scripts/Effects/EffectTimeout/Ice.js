import EffectTimeout from "@/game/scripts/Effects/EffectTimeout.js";

import { EFFECTS } from "@/game/defaults/defaults.js"

class Ice extends EffectTimeout {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.BAD_TO_COLLECT]
        this.power = EFFECTS.CLASSES.TIMEOUT.ICE.POWER
        this.color = EFFECTS.CLASSES.TIMEOUT.ICE.COLOR
    }

    beforeMod() {
        this.save = this.character_owner.movement_speed
    }

    mod() {
        const percent = EFFECTS.CLASSES.TIMEOUT.ICE.SPEED_PERCENT
        this.character_owner.movement_speed *= percent
    }

    beforeDestroy() {
        this.character_owner.movement_speed = this.save
    }
}

export default Ice