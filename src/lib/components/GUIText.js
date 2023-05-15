class GUIText extends Component {
    name = "GUIText"

    fillStyle
    string
    font

    constructor(string, fillStyle = "white", font="w0px Arial") {
        super()
        this.fillStyle = fillStyle
        this.string = string
        this.font = font
    }


    drawGUI(ctx) {
        ctx.fillSytle = this.fillStyle
        ctx.font = this.font
        ctx.fillText(this.string, this.transform.x, this.transform.y)
    }
    
}

window.GUIText = GUIText