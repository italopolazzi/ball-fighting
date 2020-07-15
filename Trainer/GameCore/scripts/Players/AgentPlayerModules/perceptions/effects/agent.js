export default {
    agentCurrentEffectIs(expected_type) {
        const effect = this.character.effect
        return this.isTheExpectedEffect(effect, expected_type)
    },
    isAgentEffectGoodToCollect() {
        const effect = this.character.effect
        return this.isEffectGoodToCollect(effect)
    },
    isAgentEffectBadToCollect() {
        const effect = this.character.effect
        return this.isEffectBadToCollect(effect)
    },
    isAgentEffectGoodToAttack() {
        const effect = this.character.effect
        return this.isEffectGoodToAttack(effect)
    },
    isAgentEffectBadToAttack() {
        const effect = this.character.effect
        return this.isEffectBadToAttack(effect)
    }
}