import EffectInstant from "/GameCore/scripts/Effects/EffectInstant.js";

import { EFFECTS } from "/GameCore/defaults/index.js"

class Death extends EffectInstant {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.BAD_TO_COLLECT]
        this.power = EFFECTS.CLASSES.INSTANT.DEATH.POWER
        this.color = EFFECTS.CLASSES.INSTANT.DEATH.COLOR
    }

    mod() {
        this.character_owner.lifes = EFFECTS.CLASSES.INSTANT.DEATH.LIFES_MOD
    }

    static info() {
        return {
            name: "Death",
            color: EFFECTS.CLASSES.INSTANT.DEATH.COLOR,
            description: "Death dev temp description",
            super_class: "EffectInstant"
        }
    }
}

export default Death