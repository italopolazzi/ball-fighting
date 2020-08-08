import Invisible from "/GameCore/scripts/Effects/EffectTimeout/Invisible.js"

import {
    TOP_FLAG,
    LEFT_FLAG,
    BOTTOM_FLAG,
    RIGHT_FLAG
} from "/GameCore/defaults/index.js"

export default {
    isOpponentNear() {
        const effect = this.opponent.character.effect
        if (effect instanceof Invisible) {
            return false
        } else {
            const distance = this.distanceFromOpponentCharacter()
            const character_diametry = this.character.diametry
            return this.distanceBetweenRadius(distance, character_diametry)
        }
    },
    isOpponentNearEffect() {
        const distance = this.distanceBetweenEffectAndOpponent()
        if (distance === false) return false
        const character_diametry = this.opponent.character.diametry
        return this.distanceBetweenRadius(distance, character_diametry)
    },
    isEffectNear() {
        const distance = this.distanceFromEnvironmentEffect()
        if (distance === false) return false
        const character_diametry = this.character.diametry
        return this.distanceBetweenRadius(distance, character_diametry)
    },
    elementAtTop(element) {
        const character = this.character
        return element.y <= character.y
    },
    elementAtRight(element) {
        const character = this.character
        return element.x >= character.x
    },
    elementAtBottom(element) {
        const character = this.character
        return element.y >= character.y
    },
    elementAtLeft(element) {
        const character = this.character
        return element.x <= character.x
    },
    isDirectionBlockedByWall(direction, expected_value) {
        const character = this.character
        const direction_position = character.real_positions[direction]
        return direction_position === expected_value
    },
    isTopBlockedByWall() {
        return this.isDirectionBlockedByWall(TOP_FLAG, 0)
    },
    isRightBlockedByWall() {
        const canvas_width = this.environment.canvas.width
        return this.isDirectionBlockedByWall(RIGHT_FLAG, canvas_width)
    },
    isBottomBlockedByWall() {
        const canvas_height = this.environment.canvas.height
        return this.isDirectionBlockedByWall(BOTTOM_FLAG, canvas_height)
    },
    isLeftBlockedByWall() {
        return this.isDirectionBlockedByWall(LEFT_FLAG, 0)
    },
    canMoveTo() {
        return {
            top: !this.isTopBlockedByWall(),
            right: !this.isRightBlockedByWall(),
            bottom: !this.isBottomBlockedByWall(),
            left: !this.isLeftBlockedByWall()
        }
    }
}