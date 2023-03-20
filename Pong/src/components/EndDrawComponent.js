class EndDrawComponent extends Component {
    draw(ctx) {
        ctx.font = "50px serif";
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER", 10, 50);
        ctx.font = "25px serif";
        ctx.fillStyle = "black";
        ctx.fillText("S - restart game", 10, 80);
        ctx.fillText("H - high scores", 10, 100);

    }
}

window.EndDrawComponent = EndDrawComponent