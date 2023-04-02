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
import "./components/MainCameraComponent.js"
import "./components/MainControllerComponent.js"
import "./components/PersistentPointsComponent.js"
import "./components/ScoreSetterComponent.js"
import "./components/StartCameraComponent.js"


//score
// let highscores = []
let reset = true


class StartScene extends Scene {
    constructor() {
        super("white")
    }

    keyUp(e) {
        if (e.key == "s") {
            SceneManager.changeScene(1);
            //sceneIndex = 1;
        }
        // if (e.key == "h") {
        //     SceneManager.changeScene(3);
        //     //sceneIndex = 3;
        // }
    }

    start() {
        this.addGameObject(new GameObject("StartConttrollerGameObject").addComponent(new StartControllerComponent()))
        this.addGameObject(new GameObject("PersistentPointsGameObject").addComponent(new PersistentPointsComponent()))
        this.addGameObject(new GameObject("WelcomeToPongGameObject").addComponent(new Text("Welcome to BrickBreaker", "black")), new Vector2(-150, -70))
        this.addGameObject(new GameObject("StartInstructionsTextGameObject").addComponent(new Text("S - start game", "black")), new Vector2(-150, -50))
        this.addGameObject(new GameObject("MaxScoreGameObject").addComponent(new Text("", "black")).addComponent(new ScoreSetterComponent()), new Vector2(-150, -30))
        Camera.main.addComponent(new StartCameraComponent());
    }

}







class MainScene extends Scene {
    constructor() {
        super()
    }

    keyUp(e) {
        if (e.key == "p") {
            isPaused = !isPaused;
        }
    }


    start() {
        // let pointsGameObject = new GameObject("PointsGameObject")
        // pointsGameObject.addComponent(new PointsComponent())
        // this.addGameObject(pointsGameObject)

        // let ballGameObject = new GameObject("BallGameObject")
        // ballGameObject.addComponent(new BallComponent())
        // this.addGameObject(ballGameObject)

        // let bricksGameObject = new GameObject("BricksGameObject")
        // bricksGameObject.addComponent(new BricksComponent())
        // this.addGameObject(bricksGameObject)

        // this.addGameObject(new GameObject("PaddleGameObject").addComponent(new PaddleComponent()))
        // this.addGameObject(new GameObject("WallsGameObject").addComponent(new WallsComponent()))
        // this.addGameObject(new GameObject("GameOverGameObject").addComponent(new GameOverComponent()))

        this.addGameObject(new GameObject("PointsGameObject")
            .addComponent(new PersistentPointsComponent())
            .addComponent(new Text("Game Points: 0", "black", "10px serif")),
            new Vector2(-150, -90));

        this.addGameObject(
            new GameObject("MaxPointsGameObject")
                .addComponent(new ScoreSetterComponent())
                .addComponent(new Text("", "black", "10px serif")),
            new Vector2(-150, -80));

        this.addGameObject(new GameObject("PaddleGameObject").addComponent(new PaddleComponent()))
        this.addGameObject(new GameObject("WallsGameObject").addComponent(new WallsComponent()))
        this.addGameObject(new GameObject("ControllerGameObject").addComponent(new MainControllerComponent()))
        Camera.main.addComponent(new MainCameraComponent());
    }
}




class EndScene extends Scene {
    keyUp(e) {
        if (e.key == "s") {
            SceneManager.changeScene(0);
            //sceneIndex = 0;
        }
        // if (e.key == "h") {
        //     SceneManager.changeScene(3);
        //     //sceneIndex = 3;
        // }

    }
    start() {
        this.addGameObject(new GameObject().addComponent(new EndControllerComponent()))
        // this.addGameObject(new GameObject().addComponent(new EndDrawComponent()))
        this.addGameObject(new GameObject("EndTextGameObject").addComponent(new Text("GAME OVER", "red", "50px serif")), new Vector2(15, 20))
        this.addGameObject(new GameObject("RestartTextGameObject").addComponent(new Text("S - restart game", "black", "25px serif"), new Vector2(15, 50)))
        this.addGameObject(new GameObject("MaxPointsGameObject")
            .addComponent(new ScoreSetterComponent())
            .addComponent(new Text("", "black", "25px serif")),
            new Vector2(15, 70))
    }


}


// class ScoreScene extends Scene {
//     keyUp(e) {
//         if (e.key == "h") {
//             SceneManager.changeScene(0);
//             //sceneIndex = 0;
//         }
//     }

//     update() {

//     }

//     draw(ctx) {
//         ctx.font = "50px serif";
//         ctx.fillStyle = "lime";
//         ctx.fillText("HIGH SCORES", 10, 50);
//         ctx.font = "25px serif";
//         ctx.fillStyle = "black";
//         ctx.fillText("H - back to start", 10, 80);
//         let startY = 100;
//         for (let i = 0; i < 10; i++) {
//             if (!(typeof highscores[i] === 'undefined')) { //i found this if statement on a stack overflow page
//                 ctx.fillText(i + 1 + ". " + highscores[i], 10, startY + 20 * i);
//             }
//         }
//     }
// }

let startScene = new StartScene();
let mainScene = new MainScene();
let endScene = new EndScene();
// let scoreScene = new ScoreScene();

SceneManager.addScene(startScene);
SceneManager.addScene(mainScene);
SceneManager.addScene(endScene);
// SceneManager.addScene(scoreScene);

window.allScenes = [startScene, mainScene, endScene]
// window.highscores = this.highscores