class WallsComponent extends Component {
    name = "WallsComponent"
    start() {
        this.margin = 20
        this.size = 200
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
             ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
             ctx.font = "50this.px serif";
             ctx.fillText("P - unpause game", canvas.width / 2, 50 + canvas.height / 2);
         }
    }
}