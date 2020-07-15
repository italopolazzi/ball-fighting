import Character from "./Character"
class Purple extends Character {
    constructor(canvas) {
        const color = "purple"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Purple",
            color: "purple",
            force: 3
        }
    }
}

export default Purple