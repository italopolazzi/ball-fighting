import TrainerBattleCanvas from "./TrainerBattleCanvas.js"
import TrainerCharacter from "./TrainerCharacter.js"
import TrainerAgentPlayer from "./TrainerAgentPlayer.js"
import TrainerBattleOffline from "./TrainerBattleOffline.js"

import loadGenomesPopulation from "/GameCore/scripts/functions/loadGenomesPopulation.js"

/** Rename vars */
const Neat = neataptic.Neat;
const Methods = neataptic.methods;
const Config = neataptic.config;
const Architect = neataptic.architect;

const TOTAL_BATTLES = 50
const POPULATION_AMOUNT = TOTAL_BATTLES * 2
const INPUT_NODES = 11
const OUTPUT_NODES = 3
const START_HIDDEN_SIZE = 2
const GENERATIONS = 1000
const MUTATION_RATE = 0.3
const ELITISM_PERCENT = 0.1
const USE_TRAINED_POP = true
const SAVER_KEY = "s"
const FILENAME = "neat_population.json"
const CANVAS_CONTAINER_ID = "training"
const CHARACTERS_COLORS = ["blue", "yellow"]

/** Turn off warnings */
Config.warnings = false;

class Trainer {
    constructor() {
        this.info = {
            high_score: 0,
            chase_effect: 0,
            chase_opponent: 0,
            run_away: 0,
            win: 0,
            lose: 0,
            tied: 0
        }
        this.neat = new Neat(
            INPUT_NODES,
            OUTPUT_NODES,
            null, {
                mutation: [
                    Methods.mutation.ADD_NODE,
                    Methods.mutation.SUB_NODE,
                    Methods.mutation.ADD_CONN,
                    Methods.mutation.SUB_CONN,
                    Methods.mutation.MOD_WEIGHT,
                    Methods.mutation.MOD_BIAS,
                    Methods.mutation.MOD_ACTIVATION,
                    Methods.mutation.ADD_GATE,
                    Methods.mutation.SUB_GATE,
                    Methods.mutation.ADD_SELF_CONN,
                    Methods.mutation.SUB_SELF_CONN,
                    Methods.mutation.ADD_BACK_CONN,
                    Methods.mutation.SUB_BACK_CONN
                ],
                popsize: POPULATION_AMOUNT,
                mutationRate: MUTATION_RATE,
                elitism: Math.round(ELITISM_PERCENT * POPULATION_AMOUNT),
                network: new Architect.Random(
                    INPUT_NODES,
                    START_HIDDEN_SIZE,
                    OUTPUT_NODES
                )
            }
        );

        if (USE_TRAINED_POP) this.neat.population = loadGenomesPopulation(POPULATION_AMOUNT);
        this.listenForKeydownToSaveNeatProgress()
        this.iterateEvaluations()
    }

    saveNeat() {
        const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.neat.population));
        const link = document.createElement("a")
        link.setAttribute("href", data)
        link.setAttribute("download", FILENAME)
        link.click()
        link.remove()
    }

    listenForKeydownToSaveNeatProgress() {
        const trainer = this
        window.addEventListener("keydown", e => {
            if (e.key === SAVER_KEY) trainer.saveNeat()
        })
    }

    setHighScore(score) {
        this.info.high_score = score > this.info.high_score ? score : this.info.high_score;
    }

    async iterateEvaluations() {
        for (let i = 0; i < GENERATIONS; i++) {
            this.clearContainer()
            await this.startEvaluation()
        }
        this.saveNeat()
    }

    clearContainer() {
        const container = document.getElementById(CANVAS_CONTAINER_ID)
        container.innerHTML = ""
    }

    startHighScore(genomes) {
        const trainer = this
        genomes.forEach(genome => {
            if (genome.score) trainer.setHighScore(genome.score)
        })
    }

    createBattle(genomes_pair, colors_pair) {
        const trainer = this

        // setup 1 battle canvas
        const battle_canvas = new TrainerBattleCanvas(CANVAS_CONTAINER_ID)

        // setup 2 characters
        const c1 = new TrainerCharacter(colors_pair.shift(), battle_canvas)
        const c2 = new TrainerCharacter(colors_pair.shift(), battle_canvas)

        // setup 2 players
        const p1 = new TrainerAgentPlayer(c1, genomes_pair.shift(), trainer)
        const p2 = new TrainerAgentPlayer(c2, genomes_pair.shift(), trainer)
        const players = [p1, p2]

        // add all in a new battle
        const battle = new TrainerBattleOffline(players, battle_canvas, trainer)
        return battle
    }

    updateInfoWithBattlesResults(battles_results) {
        const trainer = this
        battles_results.forEach(pair => {
            pair.forEach(agent_player => {
                switch (agent_player.result) {
                    case "Lose":
                        agent_player.brain.score -= 2000
                        trainer.info.lose += 1
                        break;
                    case "Tied":
                        agent_player.brain.score -= 1000
                        trainer.info.tied += 1
                        break;
                    case "Win":
                        agent_player.brain.score *= agent_player.lifeScoreNormalized()
                        trainer.info.win += 1
                        break;
                }
                trainer.setHighScore(agent_player.brain.score)
            })
        })
    }

    async startEvaluation() {
        const battles = []
        const genomes = this.neat.population.slice()

        /** Start high score when generation change */
        this.startHighScore(genomes)

        /** Create battles with 2 characters and 2 players */
        for (let i = 0; i < TOTAL_BATTLES; i++) {
            const colors = CHARACTERS_COLORS.slice()
            const battle = this.createBattle([genomes.shift(), genomes.shift()], [colors.shift(), colors.shift()])
            battles.push(battle)
        }

        const runners = battles.map(battle => battle.run())
        const battles_results = await Promise.all(runners)

        this.updateInfoWithBattlesResults(battles_results)
        this.endEvaluation()
    }



    /** End the evaluation of the current generation */
    endEvaluation() {
        console.log('Generation:', this.neat.generation, this.info);

        this.neat.sort();
        const new_population = [];

        // Elitism
        for (let i = 0; i < this.neat.elitism; i++) {
            new_population.push(this.neat.population[i]);
        }

        // Breed the next individuals
        for (let i = 0; i < this.neat.popsize - this.neat.elitism; i++) {
            new_population.push(this.neat.getOffspring());
        }

        // Replace the old population with the new population
        this.neat.population = new_population;
        this.neat.mutate();

        this.neat.generation++;
    }
}

export default Trainer