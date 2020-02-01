class Player {
    constructor(character) {
        this.character = character
        this.results = {
            win: 0,
            tied: 0,
            lose: 0
        }
        if (this.constructor === Player) {
            throw new TypeError('Abstract class "Player" cannot be instantiated directly.');
        }
        this.character.setPlayerOwner(this)
    }
}

export default Player