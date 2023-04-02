import "../../../src/lib/engine.js"

class PersistentPointsComponent extends Component {
    name = "PersistentPointsComponent"
    points = 0
    start() {
        // if(GameObject.getObjectByName("PersistentPointsGameObject") != this.parent){
        //     this.parent.destroy();
        //     console.log("Removing duplicate persistent points component");
        // }
        // else{
        //     console.log("Only one persistent points component. Move on.")
        // }
    }
    updatePoints(points) {
        this.points = points;
        document.cookie = this.points;
    }
}

window.PersistentPointsComponent = PersistentPointsComponent