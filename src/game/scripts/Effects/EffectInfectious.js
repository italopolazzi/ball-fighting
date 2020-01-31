import Effect from "@/game/scripts/Effects/Effect.js";

import { EFFECTS } from "@/game/defaults/index.js"

class EffectInfectious extends Effect {
    constructor(x, y, color) {
        super(x, y, color)
        this.types_functions = [EFFECTS.TYPES.BAD_TO_COLLECT, EFFECTS.TYPES.GOOD_TO_ATTACK]
        this.calls = 0
        this.interval = null
    }

    async apply(character) {
        this.calls++
            switch (this.calls) {
                case 1:
                    this.$start(character)
                    this.$mod()
                    await this.$run()
                    this.$destroy()
                    break;
                default:
                    this.$infect(character)
                    break;
            }
    }


    $infect(character) {
        const { x, y, color } = this
        const sub_class = this.constructor
        const sub_class_instance = new sub_class(x, y, color)
        sub_class_instance.apply(character)
    }

    run() {
        const effect = this
        let iterations = EFFECTS.CLASSES.INFECTIOUS.ITERATIONS
        return new Promise((resolve, reject) => {
            effect.interval = setInterval(() => {
                effect.mod()
                iterations--
                if (iterations === 0) {
                    effect.$destroy()
                    resolve()
                }
            }, EFFECTS.CLASSES.INFECTIOUS.INTERVAL);
        })
    }

    destroy() {
        clearInterval(this.interval)
    }
}

export default EffectInfectious