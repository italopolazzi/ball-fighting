class BattleCanvas {
    constructor(container_id) {
        try {
            this.container = null
            this.canvas = null
            this.context = null
            this.width = null
            this.height = null
            this.setupBattleCanvas(container_id)
        } catch (error) {
            console.error(error);
        }
    }

    setupBattleCanvas(container_id) {
        this.defineContainer(container_id)
        this.setupWidthAndHeight()
        this.setupCanvasElement()
        this.appendCanvasInContainer()
        this.getCanvasContext()
    }

    defineContainer(container_id) {
        this.container = document.getElementById(container_id)
    }

    setupWidthAndHeight() {
        const { width, height } = this.container.getBoundingClientRect();
        this.width = width || window.innerWidth
        this.height = height || window.innerHeight
    }

    setupCanvasElement() {
        const { width, height } = this
        this.canvas = document.createElement("canvas")
        this.canvas.width = width
        this.canvas.height = height
    }

    appendCanvasInContainer() {
        this.container.append(this.canvas)
    }

    getCanvasContext() {
        this.context = this.canvas.getContext("2d")
    }

    drawElements(elements) {
        const { context } = this
        elements.forEach(element => {
            try {
                element.draw(context)
            } catch (error) {
                console.error(error)
            }
        });
    }

    clearBattleCanvas() {
        const { context, width, height } = this
        context.clearRect(0, 0, width, height)
    }
}

export default BattleCanvas