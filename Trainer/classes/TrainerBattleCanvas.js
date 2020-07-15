import BattleCanvas from "/GameCore/scripts/Canvas/BattleCanvas.js";

class TrainerBattleCanvas extends BattleCanvas {
    constructor(container_id) {
        super(container_id)
    }

    setupWidthAndHeight() {
        this.width = 200
        this.height = 200
    }
}

export default TrainerBattleCanvas