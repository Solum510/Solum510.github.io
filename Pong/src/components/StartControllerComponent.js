import "../../../src/lib/components/Component.js"

class StartControllerComponent extends Component {
    //start
    start() {
        Camera.main.fillStyle = "white"
        GameObject.getObjectByName("PersistentPointsGameObject").doNotDestroyOnLoad();
    }

    update() {

    }
}

window.StartControllerComponent = StartControllerComponent