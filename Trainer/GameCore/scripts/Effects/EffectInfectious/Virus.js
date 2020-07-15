import EffectInfectious from "/GameCore/scripts/Effects/EffectInfectious.js";

import { EFFECTS } from "/GameCore/defaults/index.js"

class Virus extends EffectInfectious {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.BAD_TO_COLLECT, EFFECTS.TYPES.GOOD_TO_ATTACK]
        this.power = EFFECTS.CLASSES.INFECTIOUS.VIRUS.POWER
        this.color = EFFECTS.CLASSES.INFECTIOUS.VIRUS.COLOR
    }

    mod() {
        this.character_owner.decrementLifePoints()
    }

    static info() {
        return {
            name: "Virus",
            color: EFFECTS.CLASSES.INFECTIOUS.VIRUS.COLOR,
            description: "Virus dev temp description",
            super_class: "EffectInfectious"
        }
    }
}

export default Virus