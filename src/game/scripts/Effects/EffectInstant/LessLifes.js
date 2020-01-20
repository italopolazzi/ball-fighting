import EffectInstant from "@/game/scripts/Effects/EffectInstant.js";

class LessLifes extends EffectInstant {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.BAD_TO_COLLECT]
        this.power = EFFECTS.CLASSES.INSTANT.LESS_LIFES.POWER
        this.color = EFFECTS.CLASSES.INSTANT.LESS_LIFES.COLOR
    }

    mod() {
        this.character_owner.decrementLifes(EFFECTS.CLASSES.INSTANT.LESS_LIFES.DECREMENT_LIFES)
    }
}

export default LessLifes