import EffectTransferable from "@/game/scripts/Effects/EffectTransferable.js";

import { EFFECTS } from "@/game/defaults/index.js"

class Benediction extends EffectTransferable {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.BAD_TO_COLLECT, EFFECTS.TYPES.BAD_TO_ATTACK]
        this.power = EFFECTS.CLASSES.TRANSFERABLE.BENEDICTION.POWER
        this.color = EFFECTS.CLASSES.TRANSFERABLE.BENEDICTION.COLOR
    }

    mod() {
        this.character_owner.incrementLifes(EFFECTS.CLASSES.TRANSFERABLE.BENEDICTION.INCREMENT_LIFES)
    }
}

export default Benediction