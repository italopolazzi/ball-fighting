import Character from "./Character"
class Teal extends Character {
    constructor(canvas) {
        const color = "teal"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Teal",
            color: "teal",
            force: 3
        }
    }
}

export default Teal