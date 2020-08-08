import Effect from "/GameCore/scripts/Effects/Effect.js";

import { EFFECTS } from "/GameCore/defaults/index.js"

class EffectCounter extends Effect {
    constructor(x, y, color) {
        super(x, y, color)
        if (this.constructor === EffectCounter) {
            throw new TypeError('Abstract class "EffectCounter" cannot be instantiated directly.');
        }
        this.save = null
        this.iterations = EFFECTS.CLASSES.COUNTER.ITERATIONS
    }

    run() {
        if (this.iterations === 0) {
            this.$destroy
        } else {
            this.mod()
            this.iterations--
        }
    }

    destroy() {
        // do nothing
    }
}

export default EffectCounter