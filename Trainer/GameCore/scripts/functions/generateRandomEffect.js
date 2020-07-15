import loadAllEffects from "/GameCore/scripts/functions/loadAllEffects.js"

Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
}

const effects = loadAllEffects()
const getRandomBetween = (min, max) => Math.random() * (max - min) + min

const getRandomEffect = (x_limits, y_limits) => {
    const effect_class = effects.random()
    const x = getRandomBetween(...x_limits)
    const y = getRandomBetween(...y_limits)
    const effect = new effect_class(x, y)
    return effect
}

const generateRandomEffect = (x_limits, y_limits, drop_interval) => {
    if (drop_interval <= 0) {
        return getRandomEffect(x_limits, y_limits)
    } else {
        return new Promise((resolve, reject) => {
            try {
                const timeout = setTimeout(() => {
                    const effect = getRandomEffect(x_limits, y_limits)
                    clearTimeout(timeout)
                    resolve(effect)
                }, drop_interval);
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default generateRandomEffect