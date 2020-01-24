import Character from "./Character"
class Yellow extends Character {
    constructor(canvas) {
        const color = "yellow"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Yellow",
            force: 3
        }
    }
}

export default Yellow