export default {
    isOpponentEffectGoodToAttack() {
        const effect = this.opponent.character.effect
        return this.isEffectGoodToAttack(effect)
    },
    isOpponentEffectBadToAttack() {
        const effect = this.opponent.character.effect
        return this.isEffectBadToAttack(effect)
    }
}