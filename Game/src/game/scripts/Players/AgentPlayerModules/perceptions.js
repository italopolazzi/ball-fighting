import distance from "./perceptions/distance.js"
import positions from "./perceptions/positions.js"
import effects from "./perceptions/effects.js"
import status from "./perceptions/status.js"

const perceptions = {
    ...distance,
    ...positions,
    ...effects,
    ...status
}

export default perceptions