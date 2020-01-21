const EFFECTS = {
    DRAW_RADIUS: 3,
    TYPES: {
        GOOD_TO_COLLECT: "GOOD_TO_COLLECT",
        BAD_TO_ATTACK: "BAD_TO_ATTACK",
        GOOD_TO_ATTACK: "GOOD_TO_ATTACK",
        BAD_TO_COLLECT: "BAD_TO_COLLECT"
    },
    CLASSES: {
        CANCELABLE: {
            CURE: {
                POWER: 1,
                COLOR: "yellow"
            }
        },
        COUNTER: {
            ITERATIONS: 100,
            IMMUNITY: {
                POWER: 3,
                COLOR: "#8bc34a"
            },
            REVIVAL: {
                POWER: 3,
                COLOR: "#4caf50"
            },
        },
        INFECTIOUS: {
            ITERATIONS: 100,
            INTERVAL: 500,
            VIRUS: {
                POWER: -3,
                COLOR: "#009688"
            }
        },
        INSTANT: {
            DEATH: {
                POWER: -10,
                COLOR: "#607d8b",
                LIFES_MOD: 0
            },
            LESS_LIFES: {
                POWER: -1,
                COLOR: "#00bcd4",
                DECREMENT_LIFES: 1
            },
            MORE_LIFES: {
                POWER: 1,
                COLOR: "#3f51b5",
                INCREMENT_LIFES: 1
            },
        },
        INTERVAL: {
            ITERATIONS: 100,
            MILLISECONDS: 5000,
        },
        TIMEOUT: {
            MILLISECONDS: 10000,
            BOLT: {
                POWER: 2,
                COLOR: "#9c27b0",
                SPEED_PERCENT: 1.8
            },
            ICE: {
                POWER: -2,
                COLOR: "#1a237e",
                SPEED_PERCENT: 0
            },
            INVISIBLE: {
                POWER: 1,
                COLOR: "white",
                COLOR_MOD: "transparent"
            },
            TURTLE: {
                POWER: -2,
                COLOR: "#ce93d8",
                SPEED_PERCENT: 0.2
            }
        },
        TRANSFERABLE: {
            CURSE: {
                POWER: 2,
                COLOR: "#f44336",
                DECREMENT_LIFES: 2
            },
            BENEDICTION: {
                POWER: -2,
                COLOR: "#e91e63",
                INCREMENT_LIFES: 2
            }
        }
    }
}

export default EFFECTS