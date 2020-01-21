const PLAYERS = {
    AGENT: {
        SECURE_DISTANCE_PERCENTAGE: 3
    },
    LEFT: {
        CONTROLS: { top: "w", right: "d", bottom: "s", left: "a" }
    },
    RIGHT: {
        CONTROLS: { top: "ArrowUp", right: "ArrowRight", bottom: "ArrowDown", left: "ArrowLeft" }
    },
    HUMAN: {
        CHARACTER: {
            SPEED: 20
        }
    }
}

export default PLAYERS