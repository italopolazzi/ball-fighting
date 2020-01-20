export const performMovements = (character, movements_to_perform) => {
    if (movements_to_perform.includes(TOP_FLAG)) character.moveY(TOP_FLAG)
    if (movements_to_perform.includes(LEFT_FLAG)) character.moveX(LEFT_FLAG)
    if (movements_to_perform.includes(BOTTOM_FLAG)) character.moveY(BOTTOM_FLAG)
    if (movements_to_perform.includes(RIGHT_FLAG)) character.moveX(RIGHT_FLAG)
}

export default performMovements