class GUITextCentered extends Component {
    name = "GuiText"

    fillStyle 

    string
    font

    constructor(string, fillStyle = "white", font = "20px Arial"){
        super()
        this.fillStyle = fillStyle
        this.string = string
        this.font = font 
    }


    drawGui(ctx) {
        ctx.fillStyle = this.fillStyle
        ctx.font = this.font
        let measurements = ctx.measureText(this.string)

        ctx.fillText(this.string, this.transform.x-measurements.width/2, this.transform.y+measurements.actualBoundingBoxAscent/2)
    }
}

window.GUITextCentered = GUITextCentered