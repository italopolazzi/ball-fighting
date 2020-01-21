import generateRandomEffect from "@/game/scripts/functions/generateRandomEffect.js";
import euclideanDistance from '@/game/scripts/functions/euclideanDistance.js'
import Effect from "../Effects/Effect.js";

import { BATTLE } from "@/game/defaults/defaults.js"

class Battle {
    constructor(players, canvas) {
        this.players = players
        this.canvas = canvas
        this.game_elements = []
        this.effect = this.generateEffect()
        if (this.constructor === Battle) {
            throw new TypeError('Abstract class "Battle" cannot be instantiated directly.');
        }
    }

    run() {
        const battle = this
        return new Promise((resolve, reject) => {
            try {
                const animate = () => {
                    battle.canvas.clearBattleCanvas()
                    if (battle.battleEnded()) {
                        resolve(battle.players)
                        battle.drawResult()
                        return;
                    } else {
                        requestAnimationFrame(animate)
                        battle.updateGameElements()
                        battle.listenForPlayerControls()
                        battle.collideElements()
                        battle.drawBattle()
                    }
                }
                animate()
            } catch (error) {
                reject(error)
            }
        })
    }

    updateGameElements() {
        const game_elements = []
        if (!this.generating_effect) this.generateRandomEffect()
        if (this.effect) game_elements.push(this.effect)
        this.players.forEach(player => game_elements.push(player.character))
        this.game_elements = game_elements
    }

    listenForPlayerControls() {
        // to be overrided
    }

    drawBattle() {
        const { context } = this.canvas
        if (this.drawScore) this.drawScore(context)
        this.game_elements.forEach(element => element.draw(context))
    }

    async generateRandomEffect() {
        if (this.generating_effect) {
            return;
        } else {
            this.generating_effect = true
            this.effect = await this.generateEffect(BATTLE.EFFECT_DROP_INTERVAL)
            this.generating_effect = false
        }
    }

    generateEffect(drop_interval = BATTLE.EFFECT_DROP_INTERVAL_INITIAL) {
        const min_x = 0
        const max_x = this.canvas.width
        const min_y = 0
        const max_y = this.canvas.height

        const x_limits = [min_x, max_x]
        const y_limits = [min_y, max_y]

        return generateRandomEffect(x_limits, y_limits, drop_interval)
    }

    testIfEffectWasCaptured(pair) {
        if (pair.some(item => { return item instanceof Effect })) this.effect = null
    }

    collideElements() {
        const mountPairsWithoutRepetition = game_elements => {
            const pairs = []
            game_elements.slice().forEach((first, i) => {
                const tail = game_elements.slice(i + 1, game_elements.lenght)
                tail.forEach(item => pairs.push([first, item]))
            })
            return pairs
        }

        const collisionTest = (element1, element2) => {
            const distance = euclideanDistance(element1, element2)
            const correction_element1 = element1.radius
            const correction_element2 = element2.radius
            const total_correction = (correction_element2 + correction_element1)
            const visual_distance = distance - total_correction
            return visual_distance < 0
        }

        const collision = (element1, element2) => {
            this.testIfEffectWasCaptured([element1, element2])
            if (element1.collide) element1.collide(element2)
            if (element2.collide) element2.collide(element1)
        }

        const pairs = mountPairsWithoutRepetition(this.game_elements)
        const colliders = pairs.filter(pair => collisionTest(...pair))
        colliders.forEach(pair => collision(...pair))
    }

    battleEnded() {
        const losers = this.players.filter(player => player.character.lifes === 0)

        if (losers.length) {
            this.mountResult({ losers })
            return true
        }
        return false
    }

    mountResult({ losers }) {
        const tied = losers.length === this.players.length
        this.players.forEach(player => {
            if (tied) {
                player.result = BATTLE.PLAYER_TIED_FLAG
            } else {
                if (losers.includes(player)) {
                    player.result = BATTLE.PLAYER_LOSE_FLAG
                } else {
                    player.result = BATTLE.PLAYER_WIN_FLAG
                }
            }
        })
    }

    drawResult() {
        const { context } = this.canvas

        this.players.forEach((player, i) => {
            const font = {
                size: 30,
                family: "Arial",
                color: "rbga(255,255,255,.1)"
            }
            const character = player.character
            const chracter_color = character.color
            const result = player.result

            let last_pos = 60 * (i + 1)

            context.fillStyle = font.color

            context.font = `${font.size * 0.7}px ${font.family}`;
            context.fillText(chracter_color, 10, last_pos += 20);

            context.font = `${font.size * 0.5}px ${font.family}`;
            context.fillText(result, 10, last_pos += 20);
        })
    }
}

export default Battle