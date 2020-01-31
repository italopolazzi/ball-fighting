import Effect from "@/game/scripts/Effects/Effect.js";

import { EFFECTS } from "@/game/defaults/index.js"

class EffectTimeout extends Effect {
    constructor(x, y, color) {
        super(x, y, color)
        if (this.constructor === EffectTimeout) {
            throw new TypeError('Abstract class "EffectTimeout" cannot be instantiated directly.');
        }
        this.save = null
        this.timeout = null
    }

    run() {
        const effect = this
        return new Promise((resolve, reject) => {
            effect.timeout = setTimeout(() => {
                effect.$destroy()
                resolve()
            }, EFFECTS.CLASSES.TIMEOUT.MILLISECONDS);
        })
    }

    destroy() {
        clearTimeout(this.timeout)
    }
}

export default EffectTimeout