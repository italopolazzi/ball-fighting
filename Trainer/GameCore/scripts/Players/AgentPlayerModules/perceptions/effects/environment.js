export default {
    environmentEffect() {
        return this.environment.effect
    },
    environmentEffectIs(expected_type) {
        const effect = this.environmentEffect()
        return this.isTheExpectedEffect(effect, expected_type)
    },
    isEnvironmentEffectGoodToCollect() {
        const effect = this.environmentEffect()
        return this.isEffectGoodToCollect(effect)
    },
    isEnvironmentEffectBadToCollect() {
        const effect = this.environmentEffect()
        return this.isEffectBadToCollect(effect)
    },
    isEnvironmentEffectGoodToAttack() {
        const effect = this.environmentEffect()
        return this.isEffectGoodToAttack(effect)
    },
    isEnvironmentEffectBadToAttack() {
        const effect = this.environmentEffect()
        return this.isEffectBadToAttack(effect)
    }
}