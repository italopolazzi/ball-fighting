import EffectInstant from "@/game/scripts/Effects/EffectInstant.js";

class Death extends EffectInstant {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.BAD_TO_COLLECT]
        this.power = EFFECTS.CLASSES.INSTANT.DEATH.POWER
        this.color = EFFECTS.CLASSES.INSTANT.DEATH.COLOR
    }

    mod() {
        this.character_owner.lifes = EFFECTS.CLASSES.INSTANT.DEATH.LIFES_MOD
    }
}

export default Death