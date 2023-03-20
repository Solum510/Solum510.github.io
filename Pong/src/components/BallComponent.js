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

window.BallComponent = BallComponent