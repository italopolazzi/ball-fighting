import Character from "./Character.js"
class Red extends Character {
    constructor(canvas) {
        const color = "red"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Red",
            color: "red",
            force: 6
        }
    }
}

export default Red