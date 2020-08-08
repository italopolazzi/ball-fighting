import Effect from "/GameCore/scripts/Effects/Effect.js";

class EffectCancelable extends Effect {
    constructor(x, y, color) {
        super(x, y, color)
        if (this.constructor === EffectCancelable) {
            throw new TypeError('Abstract class "EffectCancelable" cannot be instantiated directly.');
        }
    }
}

export default EffectCancelable