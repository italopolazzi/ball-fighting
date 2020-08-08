import BattleOfflineSinglePlayer from "/GameCore/scripts/Battle/BattleOfflineSinglePlayer.js";

import trainer_template from "/templates/trainer.js";

class TrainerBattleOfflineSinglePlayer extends BattleOfflineSinglePlayer {
    constructor(players, canvas, trainer) {
        super(players, canvas)
        this.updateEnvironmentForAgentPlayers(this.players)
        this.trainer = trainer
        this.fitness = 500
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
                    battle.fitness--
                }
                animate()
            } catch (error) {
                reject(error)
            }
        })
    }

    battleEnded() {
        let losers = []
        let winners = []

        if (this.fitnessEmpty()) {
            losers = this.players
        } else {
            losers = this.players.filter(player => player.character.lifes === 0)
            winners = this.players.filter(player => player.character.lifes > 0)
        }

        if (losers.length) {
            this.mountResult({ losers, winners })
            return true
        }
        return false
    }

    fitnessEmpty() {
        return this.fitness === 0
    }

    drawScore(context) {
        this.drawTrainersScore()
    }

    drawTrainersScore() {
        const container = document.querySelector("#trainers")
        const { trainer } = this
        const { neat } = trainer

        const constructor = trainer.constructor.name
        const population = neat.population.length
        const average_score = neat.getAverage()
        const generation = neat.generation
        const info = trainer.info

        const template = trainer_template({
            constructor,
            info,
            population,
            average_score,
            generation
        })
        container.innerHTML = template
    }

}

export default TrainerBattleOfflineSinglePlayer