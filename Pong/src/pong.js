import "./components/StartControllerComponent.js"
import "./components/StartDrawComponent.js"
import "./components/BallComponent.js"
import "./components/BricksComponent.js"
import "./components/EndControllerComponent.js"
import "./components/EndDrawComponent.js"
import "./components/GameOverComponent.js"
import "./components/PaddleComponent.js"
import "./components/PointsComponent.js"
import "./components/WallsComponent.js"
import "../../src/lib/components/PauseComponent.js"



//score
let highscores = [];




class StartScene extends Scene {

    keyUp(e) {
        if (e.key == "s") {
            SceneManager.changeScene(1);
            //sceneIndex = 1;
        }
        if (e.key == "h") {
            SceneManager.changeScene(3);
            //sceneIndex = 3;
        }
    }

    start() {
        this.addGameObject(new GameObject("StartControllerGameObject").addComponent(new StartControllerComponent()))
        this.addGameObject(new GameObject("StartDrawGameObject").addComponent(new StartDrawComponent()))
    }

}







class MainScene extends Scene {
    keyUp(e) {
        if (e.key == "p") {
            isPaused = !isPaused;
        }
    }


    start() {
        let pointsGameObject = new GameObject("PointsGameObject")
        pointsGameObject.addComponent(new PointsComponent())
        this.addGameObject(pointsGameObject)

        let ballGameObject = new GameObject("BallGameObject")
        ballGameObject.addComponent(new BallComponent())
        this.addGameObject(ballGameObject)

        let bricksGameObject = new GameObject("BricksGameObject")
        bricksGameObject.addComponent(new BricksComponent())
        this.addGameObject(bricksGameObject)

        this.addGameObject(new GameObject("PauseGameObject").addComponent(new PauseComponent()))
        this.addGameObject(new GameObject("PaddleGameObject").addComponent(new PaddleComponent()))
        this.addGameObject(new GameObject("WallsGameObject").addComponent(new WallsComponent()))
        this.addGameObject(new GameObject("GameOverGameObject").addComponent(new GameOverComponent()))
    }
}




class EndScene extends Scene {
    keyUp(e) {
        if (e.key == "s") {
            SceneManager.changeScene(0);
            //sceneIndex = 0;
        }
        if (e.key == "h") {
            SceneManager.changeScene(3);
            //sceneIndex = 3;
        }

    }
    start() {
        this.addGameObject(new GameObject().addComponent(new EndControllerComponent()))
        this.addGameObject(new GameObject().addComponent(new EndDrawComponent()))
    }


}


class ScoreScene extends Scene {
    keyUp(e) {
        if (e.key == "h") {
            SceneManager.changeScene(0);
            //sceneIndex = 0;
        }
    }

    update() {

    }

    draw(ctx) {
        ctx.font = "50px serif";
        ctx.fillStyle = "lime";
        ctx.fillText("HIGH SCORES", 10, 50);
        ctx.font = "25px serif";
        ctx.fillStyle = "black";
        ctx.fillText("H - back to start", 10, 80);
        let startY = 100;
        for (let i = 0; i < 10; i++) {
            if (!(typeof highscores[i] === 'undefined')) { //i found this if statement on a stack overflow page
                ctx.fillText(i + 1 + ". " + highscores[i], 10, startY + 20 * i);
            }
        }
    }
}

let startScene = new StartScene();
let mainScene = new MainScene();
let endScene = new EndScene();
let scoreScene = new ScoreScene();

SceneManager.addScene(startScene);
SceneManager.addScene(mainScene);
SceneManager.addScene(endScene);
SceneManager.addScene(scoreScene);

window.allScenes = [startScene, mainScene, endScene, scoreScene]
window.highscores = highscores