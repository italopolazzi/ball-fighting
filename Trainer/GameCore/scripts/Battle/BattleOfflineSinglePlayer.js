import Battle from "./Battle.js";
import AgentPlayer from "/GameCore/scripts/Players/AgentPlayer.js";

class BattleOfflineSinglePlayer extends Battle {
    constructor(players, canvas) {
        super(players, canvas)
        this.updateEnvironmentForAgentPlayers(this.players)
    }

    updateEnvironmentForAgentPlayers(players) {
        for (let index in players) {
            const player = players[index]
            if (player instanceof AgentPlayer) player.setEnvironment(this)
        }
    }

    listenForPlayerControls() {
        this.players.forEach(player => player.requireAction())
    }
}

export default BattleOfflineSinglePlayer