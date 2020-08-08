import Character from "./Character.js"
class Indigo extends Character {
    constructor(canvas) {
        const color = "indigo"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Indigo",
            color: "indigo",
            force: 3
        }
    }
}

export default Indigo