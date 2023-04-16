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
        this.numBricks = 4;
        this.numRows = 4;
        this.bsize = this.size / (this.numBricks + 1);
        this.bheight = this.bsize / 2;
        this.bmargin = this.bsize / (this.numBricks + 1); //this should allow for 4? this.bricks. add this.margin to both sides.

        this.bricks = [{
            bx: this.margin + this.bmargin,
            by: this.margin + this.bmargin
        },]
        this.initbricks()

    }

    checkbricks() {
        console.log("check bricks")
        let ballGameObject = GameObject.getObjectByName("BallGameObject")
        let ballComponent = ballGameObject.getComponent("BallComponent")
        let pongx = ballComponent.transform.x
        let pongy = ballComponent.transform.y
        let pongVY = ballComponent.pongVY
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
                console.log("t/b")
                if (pongy == this.bricks[i].by - 10) { //top 
                    hit = true;
                    ballComponent.pongVY = -Math.abs(pongVY);
                }
                if (pongy - 5 == this.bricks[i].by + this.bheight + 10) { //bottom 
                    hit = true;
                    ballComponent.pongVY *= -1;
                }
            }
            if (pongy >= this.bricks[i].by && pongy <= this.bricks[i].by + this.bheight) { //left or right side
                console.log("l/r")
                if (pongx == this.bricks[i].bx - 10) { //left
                    hit = true;
                    ballComponent.pongVX *= -1

                }
                if (pongx == this.bricks[i].bx + this.bsize + 10) { //right
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