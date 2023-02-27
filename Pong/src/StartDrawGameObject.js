class StartDrawComponent extends Component {
    draw(ctx) {
        ctx.font = "50px serif";
        ctx.fillText("Pong", 10, 50);
        ctx.font = "25px serif";
        ctx.fillText("S - start game", 10, 80);
        ctx.fillText("H - high scores", 10, 100);
    }
}



class StartDrawGameObject extends GameObject {
    start() {
        this.addComponent(new StartDrawComponent())
    }
}