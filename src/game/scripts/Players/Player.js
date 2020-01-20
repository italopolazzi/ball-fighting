class Player {
    constructor(character) {
        this.character = character
        if (this.constructor === Player) {
            throw new TypeError('Abstract class "Player" cannot be instantiated directly.');
        }
        this.character.setPlayerOwner(this)
    }
}

export default Player