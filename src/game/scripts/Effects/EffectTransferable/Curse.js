import EffectTransferable from "@/game/scripts/Effects/EffectTransferable.js";

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
}

export default Curse