import CanvasCircle from "@/game/scripts/Canvas/CanvasCircle.js";

import Effect from "@/game/scripts/Effects/Effect.js";
import EffectTransferable from "@/game/scripts/Effects/EffectTransferable.js";
import EffectInfectious from "@/game/scripts/Effects/EffectInfectious.js";

class Character extends CanvasCircle {
    constructor(id, color, canvas) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
        super(x, y, CHARACTERS.DRAW_RADIUS, color)

        this.id = id
        this.diametry = this.radius * 2
        this.movement_speed_initial = CHARACTERS.SPEED
        this.movement_speed = this.movement_speed_initial
        this.lifes_initial = CHARACTERS.LIFES
        this.lifes = this.lifes_initial
        this.life_points_initial = CHARACTERS.LIFE_POINTS
        this.life_points = this.life_points_initial
        this.effect = null
        this.player_owner = null
        this.setLimits(canvas)
        this.setRealPositions()
    }

    draw(context) {
        this.correctAxis()
        super.draw(context)
    }

    setLimits(canvas) {
        this.limits = {
            top: this.radius,
            right: canvas.width - this.radius,
            bottom: canvas.height - this.radius,
            left: this.radius
        }
    }

    setRealPositions() {
        this.real_positions = {
            top: this.y - this.radius,
            right: this.x + this.radius,
            bottom: this.y + this.radius,
            left: this.x - this.radius
        }
    }

    setPlayerOwner(player) {
        this.player_owner = player
    }

    correctAxis() {
        const { top, right, bottom, left } = this.limits
        if (this.y < top) this.y = top
        if (this.x > right) this.x = right
        if (this.y > bottom) this.y = bottom
        if (this.x < left) this.x = left
        this.setRealPositions()
    }

    move(axis, inverter = false) {
        const direction_constant = inverter ? -1 : 1
        this[axis] += (this.movement_speed * direction_constant)
    }

    moveY(direction) {
        switch (direction) {
            case TOP_FLAG:
                this.move(VERTICAL_AXYS, true)
                break;
            case BOTTOM_FLAG:
                this.move(VERTICAL_AXYS, false)
                break;
        }
    }

    moveX(direction) {
        switch (direction) {
            case LEFT_FLAG:
                this.move(HORIZONTAL_AXYS, true)
                break;
            case RIGHT_FLAG:
                this.move(HORIZONTAL_AXYS, false)
                break;
        }
    }

    incrementLifes(v = 1) {
        this.lifes += v
        if (this.lifes > this.lifes_initial) {
            this.lifes = this.lifes_initial
            this.life_points = this.life_points_initial
        }
    }

    incrementLifePoints(v = 1) {
        this.life_points += v
        if (this.life_points > this.life_points_initial) {
            this.life_points = this.life_points - this.life_points_initial
            this.incrementLifes()
        }
    }

    decrementLifes(v = 1) {
        this.lifes -= v
        if (this.lifes < 0) this.lifes = 0
    }

    decrementLifePoints(v = 1) {
        this.life_points -= v

        if (this.life_points <= 0) {
            const difference = this.life_points * -1
            this.life_points = this.life_points_initial - difference
            this.decrementLifes()
        }
    }

    setCurrentEffect(effect) {
        this.effect = effect
    }

    collideWithCharacter(opponent) {
        const { effect } = this
        if (effect && effect instanceof EffectTransferable || effect instanceof EffectInfectious) {
            effect.apply(opponent)
        }
        opponent.decrementLifePoints()
    }

    collideWithEffect(effect) {
        effect.apply(this)
    }

    collide(obstacle) {
        if (obstacle instanceof Character) {
            this.collideWithCharacter(obstacle)
        } else if (obstacle instanceof Effect) {
            this.collideWithEffect(obstacle)
        }
    }
}

export default Character