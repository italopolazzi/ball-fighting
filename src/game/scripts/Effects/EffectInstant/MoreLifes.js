import EffectInstant from "@/game/scripts/Effects/EffectInstant.js";

class MoreLifes extends EffectInstant {
    constructor(x, y) {
        super(x, y)
        this.types_functions = [EFFECTS.TYPES.GOOD_TO_COLLECT]
        this.power = EFFECTS.CLASSES.INSTANT.MORE_LIFES.POWER
        this.color = EFFECTS.CLASSES.INSTANT.MORE_LIFES.COLOR
    }

    mod() {
        this.character_owner.incrementLifes(EFFECTS.CLASSES.INSTANT.MORE_LIFES.INCREMENT_LIFES)
    }
}

export default MoreLifes