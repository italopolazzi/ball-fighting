import EffectCounter from "@/game/scripts/Effects/EffectCounter.js";

import { EFFECTS } from "@/game/defaults/index.js"

class Immunity extends EffectCounter {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.GOOD_TO_COLLECT, EFFECTS.TYPES.GOOD_TO_ATTACK]
        this.power = EFFECTS.CLASSES.COUNTER.IMMUNITY.POWER
        this.color = EFFECTS.CLASSES.COUNTER.IMMUNITY.COLOR
    }

    beforeMod() {
        const { lifes, life_points } = this.character_owner
        this.save = { lifes, life_points }
    }

    mod() {
        for (let key in this.save) {
            this.character_owner[key] = this.save[key]
        }
    }

    beforeDestroy() {
        // do nothing
    }

    static info() {
        return {
            name: "Immunity",
            color: EFFECTS.CLASSES.COUNTER.IMMUNITY.COLOR,
            description: "Tries to keep lives and their percentages static",
            super_class: "EffectCounter"
        }
    }
}

export default Immunity