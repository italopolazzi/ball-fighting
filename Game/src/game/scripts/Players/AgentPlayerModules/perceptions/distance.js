import euclideanDistance from '@/game/scripts/functions/euclideanDistance.js'

import { PLAYERS } from "@/game/defaults/index.js"

export default {
    distanceBetweenRadius(current_distance, object_size) {
        const sdp = PLAYERS.AGENT.SECURE_DISTANCE_PERCENTAGE
        const expected_distance = sdp * object_size
        return current_distance < expected_distance
    },
    distanceFromOpponentCharacter() {
        const my_character = this.character
        const opponent_character = this.opponent.character
        return euclideanDistance(my_character, opponent_character)
    },
    distanceBetweenEffectAndOpponent() {
        const effect = this.environmentEffect()
        const opponent_character = this.opponent.character
        if (!effect) return false
        return euclideanDistance(effect, opponent_character)
    },
    distanceFromEnvironmentEffect() {
        const my_character = this.character
        const effect = this.environmentEffect()
        if (!effect) return false
        return euclideanDistance(my_character, effect)
    }
}