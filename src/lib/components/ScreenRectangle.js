class ScreenRectangle extends Component {
    name = "ScreenRectangle" 

    fillStyle

    strokeStyle

    lineWidth 

    constructor(fillStyle = "white", strokeStyle = "transparent", lineWidth = 1) {
        super()
        this.fillStyle = fillStyle
        this.strokeStyle = strokeStyle
        this.lineWidth = lineWidth
    }

    drawScreen(ctx) {
        ctx.fillStyle = this.fillStyle
        ctx.strokeStyle = this.strokeStyle
        ctx.lineWidth = this.lineWidth

        ctx.beginPath() 
        ctx.rect(-this.transform.sx/2 + this.transform.x, -this.transform.sy/2 + this.transform.y,this.transforrm.sx, this.transform.sy)
        ctx.fill()
        ctx.stroke()
    }
}

window.ScreenRectangle = ScreenRectangle
export default ScreenRectangle