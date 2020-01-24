import Character from "./Character"
class Cyan extends Character {
    constructor(canvas) {
        const color = "cyan"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Cyan",
            force: 3
        }
    }
}

export default Cyan