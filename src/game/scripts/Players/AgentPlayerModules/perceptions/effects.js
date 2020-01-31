import agent from './effects/agent.js'
import environment from './effects/environment.js'
import opponent from './effects/opponent.js'

import { EFFECTS } from "@/game/defaults/index.js"

export default {
    ...agent,
    ...environment,
    ...opponent,
    isTheExpectedEffect(effect, expected_type) {
        return effect instanceof expected_type
    },
    isEffectGoodToCollect(effect) {
        if (!effect) return false
        return effect.types_functions.includes(EFFECTS.TYPES.GOOD_TO_COLLECT)
    },
    isEffectBadToCollect(effect) {
        if (!effect) return false
        return effect.types_functions.includes(EFFECTS.TYPES.BAD_TO_COLLECT)
    },
    isEffectGoodToAttack(effect) {
        if (!effect) return false
        return effect.types_functions.includes(EFFECTS.TYPES.GOOD_TO_ATTACK)
    },
    isEffectBadToAttack(effect) {
        if (!effect) return false
        return effect.types_functions.includes(EFFECTS.TYPES.BAD_TO_ATTACK)
    }
}