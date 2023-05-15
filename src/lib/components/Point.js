class Point extends Component { 
    name = "Point"

    fillStyle 

    strokeStyle 

    lineWidth 

    constructor(fillStyle = "white", strokeStyle = "transparent", lineWidth = 1) {
        super() 
        this.fillStyle = fillStyle
        this.strokeStyle = strokeStyle 
        this.lineWidth =  lineWidth
    }

    draw(ctx) {
        ctx.fillStyle = this.fillStyle
        ctx.strokeStyle = this.strokeStyle
        ctx.lineWidth = this.lineWidth

        ctx.beginPath() 
        ctx.arc(this.transform.x, this.transform.y, this.transform.sx, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
    }
}

window.Point = Point