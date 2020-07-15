import Character from "./Character"
class Green extends Character {
    constructor(canvas) {
        const color = "green"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Green",
            color: "green",
            force: 5
        }
    }
}

export default Green