import EffectInstant from "/GameCore/scripts/Effects/EffectInstant.js";

import { EFFECTS } from "/GameCore/defaults/index.js"

class MoreLifes extends EffectInstant {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.GOOD_TO_COLLECT]
        this.power = EFFECTS.CLASSES.INSTANT.MORE_LIFES.POWER
        this.color = EFFECTS.CLASSES.INSTANT.MORE_LIFES.COLOR
    }

    mod() {
        this.character_owner.incrementLifes(EFFECTS.CLASSES.INSTANT.MORE_LIFES.INCREMENT_LIFES)
    }

    static info() {
        return {
            name: "MoreLifes",
            color: EFFECTS.CLASSES.INSTANT.MORE_LIFES.COLOR,
            description: "MoreLifes dev temp description",
            super_class: "EffectInstant"
        }
    }
}

export default MoreLifes