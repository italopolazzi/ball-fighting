import Effect from "/GameCore/scripts/Effects/Effect.js";

import { EFFECTS } from "/GameCore/defaults/index.js"

class EffectInterval extends Effect {
    constructor(x, y, color) {
        super(x, y, color)
        if (this.constructor === EffectInterval) {
            throw new TypeError('Abstract class "EffectInterval" cannot be instantiated directly.');
        }
        this.save = null
        this.interval = null
    }

    run() {
        const effect = this
        let iterations = EFFECTS.CLASSES.INTERVAL.ITERATIONS
        return new Promise((resolve, reject) => {
            effect.interval = setInterval(() => {
                effect.mod()
                iterations--
                if (iterations === 0) {
                    effect.$destroy()
                    resolve()
                }
            }, EFFECTS.CLASSES.INTERVAL.MILLISECONDS);
        })
    }

    destroy() {
        clearInterval(this.interval)
    }
}

export default EffectInterval