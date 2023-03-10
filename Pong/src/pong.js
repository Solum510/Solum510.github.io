//score
let score = 0;
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
    update() {

    }

    draw(ctx) {
        ctx.font = "50px serif";
        ctx.fillText("Pong", 10, 50);
        ctx.font = "25px serif";
        ctx.fillText("S - start game", 10, 80);
        ctx.fillText("H - high scores", 10, 100);
    }
}

class MainScene extends Scene {
    keyUp(e) {
        if (e.key == "p") {
            isPaused = !isPaused;
        }
    }

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
        //paddle
        this.px = this.margin + this.size / 2;
        this.pwidth = this.size / 3;




        //cirlce start
        this.pongx = this.margin + this.size / 2;
        this.pongy = this.margin + this.size / 2;

        //circle velocity
        this.pongVX = 4;
        this.pongVY = 3;

    }


    checkbricks() {
        let hit = false;
        for (let i = 0; i < this.bricks.length; i++) {
            if (this.pongx >= this.bricks[i].bx && this.pongx <= this.bricks[i].bx + this.bsize) { //top or bottom
                if (this.pongy + 5 == this.bricks[i].by - 5) { //top 
                    hit = true;
                    this.pongVY = -Math.abs(this.pongVY);
                }
                if (this.pongy - 5 == this.bricks[i].by + this.bheight + 5) { //bottom 
                    hit = true;
                    this.pongVY *= -1;
                }
            }
            if (this.pongy >= this.bricks[i].by && this.pongy <= this.bricks[i].by + this.bheight) { //left or right side
                if (this.pongx + 5 == this.bricks[i].bx - 5) { //left
                    hit = true;
                    this.pongVX *= -1

                }
                if (this.pongx - 5 == this.bricks[i].bx + this.bsize + 5) { //right
                    hit = true;
                    this.pongVX *= -1;
                }
            }
            if (hit) {
                this.bricks[i] = {};
                score++;
                return;
            }
        }
    }

    handleGO() {
        highscores.push(score);
        highscores.sort(function(a, b) {
            return a - b;
        });
        isPaused = false;
        this.px = this.margin + this.size / 2;
        score = 0;
        this.pongx = this.margin + this.size / 2;
        this.pongy = this.margin + this.size / 2;
        this.pongVX = 3;
        this.pongVY = 2;
        this.bricks = [{
            bx: this.margin + this.bmargin,
            by: this.margin + this.bmargin
        },];
        this.initbricks();
    }

    update() {
        //move ball
        this.pongx += this.pongVX;
        this.pongy += this.pongVY;

        //move paddle
        //this.px += pv;

        this.checkbricks();
        if (this.pongx + this.pongVX > this.margin + this.size) {
            this.pongVX *= -1
        }
        if (this.pongy + this.pongVY > this.margin + (this.size * 1.5)) { //bottom collision
            if (this.pongx > this.px - this.pwidth / 2 && this.pongx < this.px + this.pwidth / 2) {
                this.pongVY = -Math.abs(this.pongVY);
            } else { //GAME OVER
                //die
                SceneManager.changeScene(2);
                //sceneIndex = 2;
                this.handleGO();
            }
            //this.pongVY *= -1
        }
        if (this.pongx + this.pongVX < this.margin) {
            this.pongVX *= -1
        }
        if (this.pongy + this.pongVY < this.margin) {
            this.pongVY *= -1
        }

        //moving the paddle the way we do it in class
        //pull keyboard state + move paddle
        if (keysDown["ArrowRight"]) {
            this.px += 4;
        }
        if (keysDown["ArrowLeft"]) {
            this.px -= 4;
        }
        if (this.px - this.pwidth / 2 < this.margin) {
            this.px = this.margin + this.pwidth / 2;
        }
        if (this.px + this.pwidth / 2 > this.size + this.margin) {
            this.px = this.size + this.margin - this.pwidth / 2;
        }
    }





    drawbricks() {
        ctx.fillStyle = "#9e4039";
        for (let i = 0; i < this.bricks.length; i++) {
            ctx.fillRect(this.bricks[i].bx, this.bricks[i].by, this.bsize, this.bheight);
        }
    }

    draw(ctx) {
        //clear the canvas, i know this isn't how we did it in class but i googled it before we got there
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //how we did it in class
        // ctx.fillStyle = "green";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        //draw a box
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(this.margin, this.margin);
        ctx.lineTo(this.margin + this.size, this.margin); //right 
        ctx.lineTo(this.margin + this.size, this.margin + (this.size * 1.5)); //down 
        ctx.moveTo(this.margin, this.margin + (this.size * 1.5)); //bottom
        ctx.lineTo(this.margin, this.margin); //up
        ctx.stroke();

        //draw this.bricks
        //ctx.fillRect(this.bricks[0].bx, this.bricks[0].by, this.bsize, this.bheight);
        this.drawbricks();

        //draw circle
        ctx.fillStyle = "blue"
        ctx.beginPath();
        ctx.arc(this.pongx, this.pongy, 5, 0, 2 * Math.PI);
        ctx.fill();

        //paddle time
        ctx.beginPath();
        ctx.moveTo(this.px - this.pwidth / 2, (this.size * 1.5) + this.margin);
        ctx.lineTo(this.px + this.pwidth / 2, (this.size * 1.5) + this.margin);
        ctx.stroke();

        //draw score
        ctx.font = "25px serif";
        ctx.fillText(score, this.margin + this.size + this.margin, this.margin + this.size + this.margin);



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
    update() {

    }

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


class ScoreScene extends Scene {
    keyUp(e) {
        if (e.key == "h") {
            SceneManager.changeScene(0);
            //sceneIndex = 0;
        }
    }

    update() {

    }

    draw(ctx){
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


