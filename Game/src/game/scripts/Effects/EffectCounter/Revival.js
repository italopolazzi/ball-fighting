import EffectCounter from "@/game/scripts/Effects/EffectCounter.js";

import { EFFECTS } from "@/game/defaults/index.js"

class Revival extends EffectCounter {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.GOOD_TO_COLLECT, EFFECTS.TYPES.BAD_TO_ATTACK]
        this.power = EFFECTS.CLASSES.COUNTER.REVIVAL.POWER
        this.color = EFFECTS.CLASSES.COUNTER.REVIVAL.COLOR
    }

    beforeMod() {
        this.save = this.character_owner.lifes
    }

    mod() {
        this.character_owner.incrementLifePoints(this.save)
    }

    beforeDestroy() {
        // do nothing
    }

    static info() {
        return {
            name: "Revival",
            color: EFFECTS.CLASSES.COUNTER.REVIVAL.COLOR,
            description: "Adds life points to the percentage of life",
            super_class: "EffectCounter"
        }
    }
}

export default Revival