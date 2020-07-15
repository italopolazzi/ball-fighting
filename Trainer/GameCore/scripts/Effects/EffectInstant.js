import Effect from "/GameCore/scripts/Effects/Effect.js";

class EffectInstant extends Effect {
    constructor(x, y, color) {
        super(x, y, color)
        if (this.constructor === EffectInstant) {
            throw new TypeError('Abstract class "EffectInstant" cannot be instantiated directly.');
        }
    }
}

export default EffectInstant