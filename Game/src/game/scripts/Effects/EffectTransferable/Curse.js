import EffectTransferable from "@/game/scripts/Effects/EffectTransferable.js";

import { EFFECTS } from "@/game/defaults/index.js"

class Curse extends EffectTransferable {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.GOOD_TO_COLLECT, EFFECTS.TYPES.GOOD_TO_ATTACK]
        this.power = EFFECTS.CLASSES.TRANSFERABLE.CURSE.POWER
        this.color = EFFECTS.CLASSES.TRANSFERABLE.CURSE.COLOR
    }

    mod() {
        this.character_owner.decrementLifes(EFFECTS.CLASSES.TRANSFERABLE.CURSE.DECREMENT_LIFES)
    }

    static info() {
        return {
            name: "Curse",
            color: EFFECTS.CLASSES.TRANSFERABLE.CURSE.COLOR,
            description: "Removes opposing character's lives",
            super_class: "EffectTransferable"
        }
    }
}

export default Curse