import EffectCancelable from "@/game/scripts/Effects/EffectCancelable.js";

class Cure extends EffectCancelable {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.GOOD_TO_COLLECT]
        this.power = EFFECTS.CLASSES.CANCELABLE.CURE.POWER
        this.color = EFFECTS.CLASSES.CANCELABLE.CURE.COLOR
    }

    mod() {
        // do nothing
        // only overrides the previous effect
    }
}

export default Cure