import EffectTimeout from "/GameCore/scripts/Effects/EffectTimeout.js";

import { EFFECTS } from "/GameCore/defaults/index.js"

class Bolt extends EffectTimeout {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.GOOD_TO_COLLECT, EFFECTS.TYPES.BAD_TO_ATTACK]
        this.power = EFFECTS.CLASSES.TIMEOUT.BOLT.POWER
        this.color = EFFECTS.CLASSES.TIMEOUT.BOLT.COLOR
    }

    beforeMod() {
        this.save = this.character_owner.movement_speed
    }

    mod() {
        const percent = EFFECTS.CLASSES.TIMEOUT.BOLT.SPEED_PERCENT
        this.character_owner.movement_speed *= percent
    }

    beforeDestroy() {
        this.character_owner.movement_speed = this.save
    }

    static info() {
        return {
            name: "Bolt",
            color: EFFECTS.CLASSES.TIMEOUT.BOLT.COLOR,
            description: "Bolt dev temp description",
            super_class: "EffectTimeout"
        }
    }
}

export default Bolt