import Character from "./Character.js"
class Orange extends Character {
    constructor(canvas) {
        const color = "orange"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Orange",
            color: "orange",
            force: 3
        }
    }
}

export default Orange