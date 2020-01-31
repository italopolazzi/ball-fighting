import { CHARACTERS } from "@/game/defaults/index.js"

const lifeScore = player => {
    const player_lifes = player.character.lifes
    const player_life_points = player.character.life_points / CHARACTERS.LIFE_POINTS
    return player_lifes + player_life_points
}
const lifeGameStatus = (agent, human) => {
    const agent_life_score = lifeScore(agent)
    const human_life_score = lifeScore(human)
    return agent_life_score - human_life_score
}

const effectPower = player => {
    const player_effect = player.character.effect
    const effect_power = player_effect ? player_effect.power : 0
    return effect_power
}
const effectGameStatus = (agent, human) => {
    const agent_effect_power = effectPower(agent)
    const human_effect_power = effectPower(human)
    return agent_effect_power - human_effect_power
}

export default {
    lifeScoreNormalized() {
        return (lifeScore(this) / 4)
    },
    isAgentAtAdvantage() {
        const statuses = this.currentGameStatus()
        return this.isAgentWinning(statuses)
    },
    isAgentAtAdvantageByEffects() {
        const statuses = this.currentGameStatus()
        return this.isAgentWinningByEffects(statuses)
    },
    isAgentAtAdvantageByLifes() {
        const statuses = this.currentGameStatus()
        return this.isAgentWinningByLifes(statuses)
    },
    isAgentLosingByLifes(statuses) {
        return statuses.lgs < -1
    },
    isAgentTiedByLifes(statuses) {
        return statuses.lgs >= -1 && statuses.lgs <= 1
    },
    isAgentWinningByLifes(statuses) {
        return statuses.lgs > 1
    },
    isAgentLosingByEffects(statuses) {
        return statuses.egs < -1
    },
    isAgentTiedByEffects(statuses) {
        return statuses.egs >= -1 && statuses.egs <= 1
    },
    isAgentWinningByEffects(statuses) {
        return statuses.egs > 1
    },
    isAgentLosing(statuses) {
        return statuses.fgs < -1
    },
    isAgentTied(statuses) {
        return statuses.fgs >= -1 && statuses.fgs <= 1
    },
    isAgentWinning(statuses) {
        return statuses.fgs > 1
    },
    currentGameStatus() {
        const life_game_status = lifeGameStatus(this, this.opponent)
        const effect_game_status = effectGameStatus(this, this.opponent)
        const final_game_status = life_game_status + effect_game_status

        const statuses = {
            lgs: life_game_status,
            egs: effect_game_status,
            fgs: final_game_status
        }
        return statuses
    }
}