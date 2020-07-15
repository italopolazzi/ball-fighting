import AgentPlayer from '/GameCore/scripts/Players/AgentPlayer.js'

class TrainerAgentPlayer extends AgentPlayer {
    constructor(character, genome, trainer) {
        super(character, genome)
        this.trainer = trainer
        this.brain.score = 0
    }

    act(decision) {
        let acc = 0
        if (decision === 0) {
            this.trainer.info.chase_effect += 1
            if (this.isAgentAtAdvantage()) {
                acc -= 1
            } else {
                if (this.isEnvironmentEffectGoodToCollect()) {
                    acc += 1
                } else {
                    acc -= 1
                }
            }
        } else if (decision === 1) {
            this.trainer.info.chase_opponent += 1
            if (this.isAgentAtAdvantage()) {
                acc += 1
            }
            if (this.isAgentEffectGoodToAttack()) {
                acc += 1
            }
        } else {
            this.trainer.info.run_away += 1
            if (this.isAgentAtAdvantage()) {
                acc -= 1
            }
            if (this.isAgentEffectGoodToAttack()) {
                acc -= 1
            }
        }


        if (this.isOpponentNear()) {
            if (!this.isAgentAtAdvantage()) {
                acc -= 1
            }
        }

        const effect = this.character.effect
        if (effect) {
            acc += effect.power
        }

        this.brain.score += acc
        this.trainer.setHighScore(this.brain.score)
        super.act(decision)
    }
}


export default TrainerAgentPlayer