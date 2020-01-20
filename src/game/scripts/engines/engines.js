import performMovements from '@/game/scripts/functions/performMovements.js'

const keys_pressed_map = {}

export const singlePlayerMovementEngine = player => {
    const all_control_keys = Object.values(player.controls)
    onkeydown = onkeyup = (e) => {
        e = e || event;
        if (all_control_keys.includes(event.key)) keys_pressed_map[event.key] = e.type === "keydown";
        // only the keys that are pressed [ex.: ArrowUp, ArrowLeft, w and d]
        const only_pressed_keys = Object.keys(keys_pressed_map).filter(key => keys_pressed_map[key])

        const controls = player.controls
        const controls_keys = Object.keys(controls)

        if (only_pressed_keys.length) {
            // converts pressed keys to game move commands [ex.: ArrowUp => top]
            const movements_to_perform = controls_keys.filter(key => only_pressed_keys.includes(controls[key]))

            performMovements(player.character, movements_to_perform)
        }
    }
}

export const dualPlayerMovementEngine = players => {

    const getControlKeysOfAllCharacters = players => {
        const all_control_keys = []
        players.forEach(player => {
            const controls = Object.values(player.controls)
            all_control_keys.push(...controls)

        })
        return all_control_keys
    }

    const keys_pressed_map = {}
    const all_control_keys = getControlKeysOfAllCharacters(players)
    onkeydown = onkeyup = (e) => {
        e = e || event;
        if (all_control_keys.includes(event.key)) keys_pressed_map[event.key] = e.type === "keydown";

        // only the keys that are pressed [ex.: ArrowUp, ArrowLeft, w and d]
        const only_pressed_keys = Object.keys(keys_pressed_map).filter(key => keys_pressed_map[key])

        players.forEach(player => {
            const controls = player.controls
            const controls_keys = Object.keys(controls)
            const controls_values = Object.values(controls)

            // only the keys that are pressed and are of the player [ex.: ArrowUp and ArrowLeft]
            const player_pressed_keys = only_pressed_keys.filter(key => controls_values.includes(key))
            if (player_pressed_keys.length) {
                // converts pressed keys to game move commands [ex.: ArrowUp => top]
                const movements_to_perform = controls_keys.filter(key => player_pressed_keys.includes(controls[key]))
                performMovements(player.character, movements_to_perform)
            }
        })
    }
}