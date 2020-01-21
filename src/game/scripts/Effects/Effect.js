import CanvasCircle from "@/game/scripts/Canvas/CanvasCircle.js";

import { EFFECTS } from "@/game/defaults/defaults.js"

class Effect extends CanvasCircle {
    constructor(x, y, color) {
        super(x, y, EFFECTS.DRAW_RADIUS, color)
        if (this.constructor === Effect) {
            throw new TypeError('Abstract class "Effect" cannot be instantiated directly.');
        }
        this.character_owner = null
        this.performed_table = {
            $mod: false,
            $run: false,
            $destroy: false
        }
    }

    setCharacterOwner(character) {
        this.character_owner = character
    }

    draw(context) {
        const { x, y } = this
        context.font = `12px Arial`;
        context.fillText(this.constructor.name, x, (y + (this.radius * 3)))
        super.draw(context)
    }
    async apply(character) {
        this.$start(character)
        this.$mod()
        await this.$run()
        this.$destroy()
    }

    destroyPreviousEffect(character) {
        // destroy previous effect to apply this without losing the saved original details
        const prev_effect = character.effect
        if (prev_effect) prev_effect.$destroy()
    }

    $start(character) {
        // can't be overrided

        // sets the character for the effect
        this.setCharacterOwner(character)

        this.destroyPreviousEffect(character)

        // sets the effect for the character
        character.setCurrentEffect(this)
    }
    $mod() {
        if (!this.performed_table.$mod) {
            this.beforeMod()
            this.mod()
            this.performed_table.$mod = true
        }
    }

    async $run() {
        if (!this.performed_table.$run) {
            await this.run()
            this.performed_table.$run = true
        }
    }

    $destroy() {
        if (!this.performed_table.$destroy) {
            this.beforeDestroy()
            this.destroy()
            this.destroyed()
            this.performed_table.$destroy = true
        }
    }

    // INTERNAL HOOKS METHODS

    beforeMod() {
        // to be overrided
        // use it to save original details before mod the character
    }

    mod() {
        // to be overrided
        // use it to mod character's details
    }

    run() {
        // to be overrided
        // use it to set a timeout/interval to keep the effects' mod before destroy
    }

    beforeDestroy() {
        // to be overrided
        // use it to recover saved details from the caracter before destroy
    }

    destroy() {
        // to be overrided
        // use it to clear intervals/timeouts or clear variable referencing
    }

    destroyed() {
        // can't be overrided
        // remove an owner's reference for this effect
        const owner = this.character_owner
        if (owner.effect === this) owner.setCurrentEffect(null)
        this.setCharacterOwner(null)
    }
}

export default Effect