import Character from "./Character"
class Red extends Character {
    constructor(canvas) {
        const color = "red"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Red",
            force: 6
        }
    }
}

export default Red