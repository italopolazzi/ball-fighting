import EffectTimeout from "@/game/scripts/Effects/EffectTimeout.js";

import { EFFECTS } from "@/game/defaults/index.js"

class Invisible extends EffectTimeout {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.GOOD_TO_COLLECT, EFFECTS.TYPES.BAD_TO_ATTACK]
        this.power = EFFECTS.CLASSES.TIMEOUT.INVISIBLE.POWER
        this.color = EFFECTS.CLASSES.TIMEOUT.INVISIBLE.COLOR
    }

    beforeMod() {
        this.save = this.character_owner.color
    }

    mod() {
        const color = EFFECTS.CLASSES.TIMEOUT.INVISIBLE.COLOR_MOD
        this.character_owner.color = color
    }

    beforeDestroy() {
        this.character_owner.color = this.save
    }

    static info() {
        return {
            name: "Invisible",
            color: EFFECTS.CLASSES.TIMEOUT.INVISIBLE.COLOR,
            description: "Invisible dev temp description",
            super_class: "EffectTimeout"
        }
    }
}

export default Invisible