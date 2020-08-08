import Player from './Player.js'
import agent_modules from './AgentPlayerModules/index.js'

class AgentPlayer extends Player {
    constructor(character, genome, nickname = "agent_player") {
        super(character, nickname)
        this.opponent = null
        this.environment = null
        this.brain = genome
        this.mapAgentModules(agent_modules)
    }

    /* /////////////////////// */
    /* ini CORE AGENT METHODS */
    /* /////////////////////// */

    requireAction() {
        if (!this.environment) throw Error("Não sei como agir porque não definiram em que ambiente estou")
        this.update()
    }

    setEnvironment(environment) {
        this.opponent = environment.players.find(player => player !== this)
        this.environment = environment
    }

    mapAgentModules(modules) {
        const validModulesFormat = modules => {
            switch (typeof modules) {
                case "array":
                    return modules
                case "object":
                    return Object.values(modules)
                default:
                    throw Error("Invalid modules format");
            }
        }
        modules = validModulesFormat(modules)
        const agent_player = this
        modules.forEach(module => {
            Object.keys(module).forEach(key => agent_player[key] = module[key])
        });
    }

    /* /////////////////////// */
    /* end CORE AGENT METHODS */
    /* /////////////////////// */

    perceive() {
        const boolToInt = bool => {
            return bool ? 1 : 0;
        }

        const booleans = [
            this.isAgentEffectGoodToCollect(),
            this.isAgentEffectGoodToAttack(),
            this.isEnvironmentEffectGoodToCollect(),
            this.isEnvironmentEffectGoodToAttack(),
            this.isOpponentEffectGoodToAttack(),
            this.isOpponentNear(),
            this.isOpponentNearEffect(),
            this.isEffectNear(),
            this.isAgentAtAdvantage(),
            this.isAgentAtAdvantageByEffects(),
            this.isAgentAtAdvantageByLifes(),
        ]
        const booleans_to_int = booleans.map(bool => boolToInt(bool))
        const input = [...booleans_to_int]
        return input
    }

    decide(perception) {
        const higherIndex = output => {
            let higher_index = 0
            for (let index in output) {
                const current = output[index]
                const higher = output[higher_index]
                higher_index = current > higher ? index : higher_index
            }
            return higher_index
        }

        const output = this.brain.activate(perception)
        return Number.parseInt(higherIndex(output))
    }

    act(decision) {
        switch (decision) {
            case 0:
                this.chaseTheEffect()
                break;
            case 1:
                this.chaseTheOpponent()
                break;
            case 2:
                this.runOfTheOpponent()
                break;
        }
    }

    update() {
        const perception = this.perceive()
        const decision = this.decide(perception)
        this.act(decision)
    }

}


export default AgentPlayer