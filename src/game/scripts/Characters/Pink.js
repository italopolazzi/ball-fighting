import Character from "./Character"
class Pink extends Character {
    constructor(canvas) {
        const color = "Pink"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Pink",
            color: "pink",
            force: 3
        }
    }
}

export default Pink