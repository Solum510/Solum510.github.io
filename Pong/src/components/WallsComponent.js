class WallsComponent extends Component {
    
    name = "WallsComponent"
    start() {
        this.margin = 0
        this.size = 100
        this.canvas = document.getElementById("canv");
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }

    draw(ctx) {
         //draw a box
         ctx.fillStyle = "black";
         ctx.beginPath();
         ctx.moveTo(this.margin, this.margin);
         ctx.lineTo(this.margin + this.size, this.margin); //right 
         ctx.lineTo(this.margin + this.size, this.margin + (this.size * 1.5)); //down 
         ctx.moveTo(this.margin, this.margin + (this.size * 1.5)); //bottom
         ctx.lineTo(this.margin, this.margin); //up
         ctx.stroke();

         //pause instructions
         ctx.fillText("P - pause game", this.margin + this.size + this.margin, this.margin + this.size + this.margin + 30);
         //show the game is paused to prevent user confusion
         if (isPaused) {
             ctx.font = "100px serif";
             ctx.fillStyle = "red";
             ctx.fillText("PAUSED", this.canvas.width / 4, this.canvas.height / 2);
             ctx.font = "50this.px serif";
             ctx.fillText("P - unpause game", this.canvas.width / 4, 50 + this.canvas.height / 2);
         }
    }
}

window.WallsComponent = WallsComponent