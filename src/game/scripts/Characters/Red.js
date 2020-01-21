import Character from "./Character"
class Red extends Character {
    constructor(canvas) {
        const color = "red"
        super(color, color, canvas)
    }
}

export default Red