//score
let highscores = [];

class StartControllerComponent extends Component {
    //start

    update() {

    }
}

class StartControllerGameObject extends GameObject {
    start() {
        this.addComponent(new StartControllerComponent())
    }
}


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
        this.addGameObject(new StartControllerGameObject())
        this.addGameObject(new StartDrawGameObject())
    }

}


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

class BallComponent extends Component {
    name = "BallComponent"
    start() {
        //stage specs
        this.margin = 20;
        this.size = 200;

        //cirlce start
        this.transform.x = this.margin + this.size / 2;
        this.transform.y = this.margin + this.size / 2;

        //circle velocity
        this.pongVX = 4;
        this.pongVY = 3;
    }

    //        this.addGameObject(new GameObject("GameOverGameObject").addComponent(new GameOverComponent()))
    update() {
        let paddleGameObject = GameObject.getObjectByName("PaddleGameObject")
        let paddleComponent = paddleGameObject.getComponent("PaddleComponent")
        let pwidth = paddleComponent.pwidth
        let px = paddleComponent.transform.x

      

        let bricksGameObject = GameObject.getObjectByName("BricksGameObject")
        let bricksComponent = bricksGameObject.getComponent("BricksComponent")

        let gameOverGameObject = GameObject.getObjectByName("GameOverGameObject")
        let gameOverComponent = gameOverGameObject.getComponent("GameOverComponent")
        //move ball
        this.transform.x += this.pongVX;
        this.transform.y += this.pongVY;

        //move paddle
        //this.px += pv;

        bricksComponent.checkbricks();
        if (this.transform.x + this.pongVX > this.margin + this.size) {
            this.pongVX *= -1
        }
        if (this.transform.y + this.pongVY > this.margin + (this.size * 1.5)) { //bottom collision
            
            if (px - pwidth / 2 <= this.transform.x && px + pwidth / 2 >= this.transform.x) {
                this.pongVY = -Math.abs(this.pongVY);
            } else { //GAME OVER
                //die
                console.log(gameOverComponent.margin)
                gameOverComponent.handleGO();
                SceneManager.changeScene(2);
                //sceneIndex = 2;
                
            }
            //this.pongVY *= -1
        }
        if (this.transform.x + this.pongVX < this.margin) {
            this.pongVX *= -1
        }
        if (this.transform.y + this.pongVY < this.margin) {
            this.pongVY *= -1
        }
    }

    draw(ctx) {
        //draw circle
        ctx.fillStyle = "blue"
        ctx.beginPath();
        ctx.arc(this.transform.x, this.transform.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class BricksComponent extends Component {
    name = "BricksComponent"
    initbricks() {
        for (let i = 1; i < 16; i++) {
            if (i % 4 == 0) {
                //new row
                this.bricks.push({
                    bx: this.margin + this.bmargin,
                    by: this.bricks[i - 1].by + this.bheight + this.bmargin
                });
            } else {
                this.bricks.push({
                    bx: this.bricks[i - 1].bx + this.bsize + this.bmargin,
                    by: this.bricks[i - 1].by
                });
            }
        }
        //console.log(this.bricks);
    }
    start() {
        //stage specs
        this.margin = 20;
        this.size = 200;

        //brick stuff
        this.bheight = 10;
        this.bsize = this.size / 5;
        this.bmargin = this.bsize / 5; //this should allow for 4? this.bricks. add this.margin to both sides.

        this.bricks = [{
            bx: this.margin + this.bmargin,
            by: this.margin + this.bmargin
        },]
        this.initbricks()

    }

    checkbricks() {
        let pointsGameObject = GameObject.getObjectByName("PointsGameObject")
        let pointsComponent = pointsGameObject.getComponent("PointsComponent")

        let ballGameObject = GameObject.getObjectByName("BallGameObject")
        let ballComponent = ballGameObject.getComponent("BallComponent")
        let pongx = ballComponent.transform.x
        let pongy = ballComponent.transform.y
        let pongVY = ballComponent.pongVY
        let pongVX = ballComponent.pongVX
        let hit = false;
        for (let i = 0; i < this.bricks.length; i++) {
            let brickDots = [
                { x: this.bricks[i].bx + this.bsize / 2, y: this.bricks[i].by + this.bheight / 2 },
                { x: this.bricks[i].bx, y: this.bricks[i].by },
                { x: this.bricks[i].bx + this.bsize, y: this.bricks[i].by },
                { x: this.bricks[i].bx, y: this.bricks[i].by + this.bheight },
                { x: this.bricks[i].bx + this.bsize, y: this.bricks[i].by + this.bheight }
            ]; //center, tleft, tright, bleft, bright
            let brickCenter = brickDots[0];
            let max = Number.NEGATIVE_INFINITY;

            if (pongx >= this.bricks[i].bx && pongx <= this.bricks[i].bx + this.bsize) { //top or bottom
                if (pongy + 5 == this.bricks[i].by - 5) { //top 
                    hit = true;
                    ballComponent.pongVY = -Math.abs(pongVY);
                }
                if (pongy - 5 == this.bricks[i].by + this.bheight + 5) { //bottom 
                    hit = true;
                    ballComponent.pongVY *= -1;
                }
            }
            if (pongy >= this.bricks[i].by && pongy <= this.bricks[i].by + this.bheight) { //left or right side
                if (pongx + 5 == this.bricks[i].bx - 5) { //left
                    hit = true;
                    ballComponent.pongVX *= -1

                }
                if (pongx - 5 == this.bricks[i].bx + this.bsize + 5) { //right
                    hit = true;
                    ballComponent.pongVX *= -1;
                }
            }
            if (hit) {
                this.bricks[i] = {};
                pointsComponent.score++;
                return;
            }
        }
    }

    update() {

    }

    draw(ctx) {
        ctx.fillStyle = "#9e4039";
        for (let i = 0; i < this.bricks.length; i++) {
            ctx.fillRect(this.bricks[i].bx, this.bricks[i].by, this.bsize, this.bheight);
        }

    }

}
class PaddleComponent extends Component {
    name = "PaddleComponent"
    start() {
            //stage specs
            this.margin = 20;
            this.size = 200;
    
            //paddle
            this.transform.x = this.margin + this.size / 2;
            this.pwidth = this.size / 3
    }
    update() {
        if (keysDown["ArrowRight"]) {
            this.transform.x += 4;
        }
        if (keysDown["ArrowLeft"]) {
            this.transform.x -= 4;
        }
        if (this.transform.x - this.pwidth / 2 < this.margin) {
            this.transform.x = this.margin + this.pwidth / 2;
        }
        if (this.transform.x + this.pwidth / 2 > this.size + this.margin) {
            this.transform.x = this.size + this.margin - this.pwidth / 2;
        }
    }

    draw(ctx){
         //paddle time
         ctx.beginPath();
         ctx.moveTo(this.transform.x - this.pwidth / 2, (this.size * 1.5) + this.margin);
         ctx.lineTo(this.transform.x + this.pwidth / 2, (this.size * 1.5) + this.margin);
         ctx.stroke();
    }
}

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
        let pointsGameObject = GameObject.getObjectByName("PointsGameObject")
        let pointsComponent = pointsGameObject.getComponent("PointsComponent")

        let ballGameObject = GameObject.getObjectByName("BallGameObject")
        let ballComponent = ballGameObject.getComponent("BallComponent")

        let bricksGameObject = GameObject.getObjectByName("BricksGameObject")
        let bricksComponent = bricksGameObject.getComponent("BricksComponent")

        let paddleGameObject = GameObject.getObjectByName("PaddleGameObject")
        let paddleComponent = paddleGameObject.getComponent("PaddleComponent")


        highscores.push(pointsComponent.score);
        highscores.sort(function (a, b) {
            return a - b;
        });
        isPaused = false;
        // paddleComponent.transform.x = this.margin + this.size / 2;
        // pointsComponent.score = 0;
        // ballComponent.transform.x = this.margin + this.size / 2;
        // ballComponent.transform.y = this.margin + this.size / 2;
        // ballComponent.pongVX = 3;
        // ballComponent.pongVY = 2;
        // bricksComponent.bricks = [{
        //     bx: this.margin + bricksComponent.bmargin,
        //     by: this.margin + bricksComponent.bmargin
        // },];
        // bricksComponent.initbricks();
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
        pointsGameObject.transform.x = 0
        pointsGameObject.transform.y = 0
        this.addGameObject(pointsGameObject)

        let ballGameObject = new GameObject("BallGameObject")
        ballGameObject.addComponent(new BallComponent())
        this.addGameObject(ballGameObject)

        let bricksGameObject = new GameObject("BricksGameObject")
        bricksGameObject.addComponent(new BricksComponent())
        this.addGameObject(bricksGameObject)

        this.addGameObject(new GameObject("PaddleGameObject").addComponent(new PaddleComponent()))
        this.addGameObject(new GameObject("WallsGameObject").addComponent(new WallsComponent()))
        this.addGameObject(new GameObject("GameOverGameObject").addComponent(new GameOverComponent()))
    }
}



class EndController extends Component {
    update() {

    }
}

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
        this.addGameObject(new GameObject().addComponent(new EndController()))
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