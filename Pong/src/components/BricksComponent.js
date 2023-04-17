class BricksComponent extends Component {
    name = "BricksComponent"
    initbricks() {
        for (let i = 1; i < (this.numBricks * this.numRows); i++) {
            if (i % this.numBricks == 0) {
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
        this.margin = -70;
        this.size = 85;

        //brick stuff
        this.numBricks = 1;
        this.numRows = 1;
        this.bsize = this.size / (this.numBricks + 1);
        this.bheight = this.bsize / 2;
        this.bmargin = this.bsize / (this.numBricks + 1); //this should allow for 4? this.bricks. add this.margin to both sides.

        this.bricks = [{
            bx: this.margin + this.bmargin,
            by: this.margin + this.bmargin
        },]
        console.log("bx: " + this.bricks[0].bx) //-48.75
        console.log("by: " + this.bricks[0].by) //-48.75
        this.initbricks()

    }

    checkbricks() {
        //https://codeincomplete.com/articles/collision-detection-in-breakout/
        let ballGameObject = GameObject.getObjectByName("BallGameObject")
        let ballComponent = ballGameObject.getComponent("BallComponent")
        let pongx = ballComponent.transform.x
        let pongy = ballComponent.transform.y
        let pongVY = ballComponent.pongVY
        let pongVX = ballComponent.pongVX
        let hit = false;
        for (let i = 0; i < this.bricks.length; i++) {
            // let brickDots = [
            //     { x: this.bricks[i].bx + this.bsize / 2, y: this.bricks[i].by + this.bheight / 2 },
            //     { x: this.bricks[i].bx, y: this.bricks[i].by },
            //     { x: this.bricks[i].bx + this.bsize, y: this.bricks[i].by },
            //     { x: this.bricks[i].bx, y: this.bricks[i].by + this.bheight },
            //     { x: this.bricks[i].bx + this.bsize, y: this.bricks[i].by + this.bheight }
            // ]; //center, tleft, tright, bleft, bright
            // let brickCenter = brickDots[0];
            // let max = Number.NEGATIVE_INFINITY;

            if (pongx >= this.bricks[i].bx && pongx <= this.bricks[i].bx + this.bsize) { //top or bottom
                if (pongy + pongVY < this.bricks[i].by + this.bheight) { //bottom 
                    console.log("bottom")
                    hit = true;
                    ballComponent.pongVY *= -1;
                }
                if (pongy + pongVY > this.bricks[i].by) { //top 
                    console.log("top")
                    hit = true;
                    ballComponent.pongVY = -Math.abs(pongVY);
                }
            }
            if (pongy >= this.bricks[i].by && pongy <= this.bricks[i].by + this.bheight) { //left or right side
                if (pongx + pongVX <  this.bricks[i].bx) { //left
                    console.log("left")
                    hit = true;
                    ballComponent.pongVX *= -1

                }
                if (pongx + pongVX < this.bricks[i].bx + this.bsize) { //right
                    console.log("right")
                    hit = true;
                    ballComponent.pongVX *= -1;
                }
            }
            if (hit) {
                this.bricks[i] = {};
                this.updateListeners("Rebound")
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

window.BricksComponent = BricksComponent