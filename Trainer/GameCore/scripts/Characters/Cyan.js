import Character from "/GameCore/scripts/Characters/Character"
class Cyan extends Character {
    constructor(canvas) {
        const color = "cyan"
        super(color, color, canvas)
    }

    static info() {
        return {
            name: "Cyan",
            color: "cyan",
            force: 3
        }
    }
}

export default Cyan