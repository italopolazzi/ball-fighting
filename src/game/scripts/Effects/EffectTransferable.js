import Effect from "@/game/scripts/Effects/Effect.js";

class EffectTransferable extends Effect {
    constructor(x, y, color) {
        super(x, y, color)
        if (this.constructor === EffectTransferable) {
            throw new TypeError('Abstract class "EffectTransferable" cannot be instantiated directly.');
        }
        this.calls = 0
    }

    async apply(character) {
        this.calls++
            switch (this.calls) {
                case 1:
                    this.$start(character)
                    break;
                case 2:
                    this.$transfers(character)
                    this.$mod()
                    await this.$run()
                    this.$destroy()
                    break;
            }
    }

    $transfers(character) {
        this.destroyed()
        this.$start(character)
    }
}

export default EffectTransferable