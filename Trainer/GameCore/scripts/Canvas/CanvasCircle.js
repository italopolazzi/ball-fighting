import CanvasDrawableElement from "./CanvasDrawableElement.js";

import { CANVAS_CIRCLE } from "/GameCore/defaults/index.js"

class CanvasCircle extends CanvasDrawableElement {
    constructor(x, y, radius, color, anticlockwise = true, mode = "fill") {
        super("circle")
        this.x = x
        this.y = y
        this.radius = radius
        this.startAngle = CANVAS_CIRCLE.START_ANGLE
        this.endAngle = CANVAS_CIRCLE.END_ANGLE
        this.color = color
        this.anticlockwise = anticlockwise
        this.mode = mode
    }

    draw(context) {
        const { x, y, radius, startAngle, endAngle, color, anticlockwise, mode } = this
        context.beginPath()
        context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
        context.fillStyle = color
        mode === "fill" ? context.fill() : context.stroke()
        context.closePath()

    }
}

export default CanvasCircle