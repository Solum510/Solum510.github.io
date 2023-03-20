class PointsComponent extends Component {
    name = "PointsComponent"
    start() {
        this.score = 0;
    }

    update() {

    }

    draw(ctx) {
        //draw score
        ctx.font = "25px serif";
        ctx.fillText(this.score, this.margin + this.size + this.margin, this.margin + this.size + this.margin);
    }
}