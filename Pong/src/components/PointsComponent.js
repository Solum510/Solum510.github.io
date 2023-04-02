import "../../../src/lib/engine.js"
import "./PersistentPointsComponent.js"

class PointsComponent extends Component {
    name = "PointsComponent"
    start() {
        this.points = 0;
        this.parent.getComponent("Text").font = "25px serif"
    }

    handleUpdate(component, eventName){
        if(eventName == "Rebound"){
            this.points++;
            let persistentPointsComponent = GameObject.getObjectByName("PersistentPointsGameObject")
            .getComponent("PersistentPointsComponent")
            if(this.points > persistentPointsComponent.points){
                persistentPointsComponent.updatePoints(this.points)
            }
        }
    }
    update() {
        this.parent.getComponent("Text").string = "Score: " + this.points
    }

    // draw(ctx) {
    //     //draw score
    //     ctx.font = "25px serif";
    //     ctx.fillText(this.score, this.margin + this.size + this.margin, this.margin + this.size + this.margin);
    // }
}

window.PointsComponent = PointsComponent