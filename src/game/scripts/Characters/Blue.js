import Character from "./Character"
class Blue extends Character {
    constructor(canvas) {
        const color = "blue"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Blue",
            force: 3
        }
    }
}

export default Blue