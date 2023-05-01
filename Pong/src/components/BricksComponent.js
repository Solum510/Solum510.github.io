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
        this.bmargin = this.bsize / (this.numBricks + 1); 

        this.bricks = [{
            bx: this.margin + this.bmargin,
            by: this.margin + this.bmargin
        },]
        console.log("bx: " + this.bricks[0].bx) //-48.75
        console.log("by: " + this.bricks[0].by) //-48.75
        this.initbricks()

    }

    checkbricks() {
        let ballGameObject = GameObject.getObjectByName("BallGameObject")
        let ballComponent = ballGameObject.getComponent("BallComponent")
        let pongx = ballComponent.transform.x
        let pongy = ballComponent.transform.y
        let pongVY = ballComponent.pongVY
        let pongVX = ballComponent.pongVX
        let hit = false;
        for (let i = 0; i < this.bricks.length; i++) {

            if (pongx >= this.bricks[i].bx && pongx <= this.bricks[i].bx + this.bsize) { //top or bottom
                if (pongy > this.bricks[i].by && 
                    pongy < this.bricks[i].by + this.bheight) { //top 
                    console.log("top/bottom")
                    hit = true;
                    ballComponent.pongVY *= -1 
                }
            }
            if (pongy >= this.bricks[i].by && pongy <= this.bricks[i].by + this.bheight) { //left or right side
                if (pongx >  this.bricks[i].bx 
                    && pongx < this.bricks[i].bx + this.bsize) { //left
                    console.log("left/right")
                    hit = true;
                    ballComponent.pongVX *= -1
                }
            }
            if (hit) {
                this.bricks.splice(i,1);
                this.updateListeners("Rebound")
                return;
            }
        }
    }

    update() {

    }

    emptyBricks() {
        console.log(this.bricks.length)
        let ballGameObject = GameObject.getObjectByName("BallGameObject")
            let ballComponent = ballGameObject.getComponent("BallComponent")
        if(this.bricks.length == 0) {
            this.numBricks += 2
            this.numRows += 1
            ballComponent.decreaseVels()
            this.bsize = this.size / (this.numBricks + 1);
            this.bheight = this.bsize / 2;
            this.bmargin = this.bsize / (this.numBricks + 1); 
            this.bricks = [{
                bx: this.margin + this.bmargin,
                by: this.margin + this.bmargin
            },]
            this.initbricks()
        } else {
            ballComponent.incXVel(Math.random() / 8)
            ballComponent.incYVel(Math.random() / 8)
            console.log("vx:" + ballComponent.pongVX)
            console.log("vy:"+ballComponent.pongVY)
        }

    }
    draw(ctx) {
        ctx.fillStyle = "#9e4039";
        for (let i = 0; i < this.bricks.length; i++) {
            ctx.fillRect(this.bricks[i].bx, this.bricks[i].by, this.bsize, this.bheight);
        }

    }

}

window.BricksComponent = BricksComponent