class WallsComponent extends Component {
    
    name = "WallsComponent"
    start() {
        this.margin = 20
        this.size = 200
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

    }
}

window.WallsComponent = WallsComponent