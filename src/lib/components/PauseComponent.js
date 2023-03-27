class PauseComponent extends Component {
    name = "PauseComponent"

    start() {
        this.margin = 20
        this.size = 200
        this.canvas = document.getElementById("canv");
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }

    draw(ctx){
        ctx.fillStyle = "black";
        //pause instructions
        ctx.fillText("P - pause game", this.margin + this.size + this.margin, this.margin + this.size + this.margin + 30);
        //show the game is paused to prevent user confusion
        if (isPaused) {
            ctx.font = "100px serif";
            ctx.fillStyle = "red";
            ctx.fillText("PAUSED", this.canvas.width / 4, this.canvas.height / 2);
            ctx.font = "50this.px serif";
            ctx.fillText("P - unpause game", this.canvas.width / 4, 100 + this.canvas.height / 2);
        }
    }
}

window.PauseComponent = PauseComponent