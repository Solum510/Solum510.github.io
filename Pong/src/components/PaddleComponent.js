class PaddleComponent extends Component {
    name = "PaddleComponent"
    start() {
            //stage specs
            this.margin = -70;
            this.size = 85;
    
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
        //make the paddle move on it's own
        // let ballGameObject = GameObject.getObjectByName("BallGameObject")
        // let ballComponent = ballGameObject.getComponent("BallComponent")
        // this.transform.x = ballComponent.transform.x
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

window.PaddleComponent = PaddleComponent