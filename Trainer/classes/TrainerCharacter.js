import Character from "/GameCore/scripts/Characters/Character.js";

class TrainerCharacter extends Character {
    constructor(color, canvas) {
        super(color, color, canvas)
        this.radius = 5
    }
}

export default TrainerCharacter