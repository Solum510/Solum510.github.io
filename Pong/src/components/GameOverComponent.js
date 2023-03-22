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
        highscores.push(GameObject.getObjectByName("PointsGameObject").getComponent("PointsComponent").score);
        highscores.sort(function (a, b) {
            return a - b;
        });
        isPaused = false;
    }
}

window.GameOverComponent = GameOverComponent