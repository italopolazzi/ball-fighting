import Character from "./Character.js"
class Blue extends Character {
    constructor(canvas) {
        const color = "blue"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Blue",
            color: "blue",
            force: 3
        }
    }
}

export default Blue