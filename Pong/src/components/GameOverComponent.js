class GameOverComponent extends Component {
    name = "GameOverComponent"
    start() {
        this.margin = 20;
        this.size = 200;
    }

    update() {

    }

    draw(){

    }

    handleGO() {
        highscores.push(pointsComponent.score);
        highscores.sort(function (a, b) {
            return a - b;
        });
        isPaused = false;
    }
}