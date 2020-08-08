import neat_population from '@/game/json/neat_population.js'
const neataptic = require("@/game/vendor/neataptic.js")

const loadGenomesPopulation = population_amount => {
    const loaded_population = []
    for (let i = 0; i < population_amount; i++) {
        const json = neat_population[i % neat_population.length];
        loaded_population[i] = neataptic.Network.fromJSON(json);
    }
    return loaded_population
}

export default loadGenomesPopulation