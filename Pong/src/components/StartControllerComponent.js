import "../../../src/lib/components/Component.js"

class StartControllerComponent extends Component {
    //start
    start() {
        GameObject.getObjectByName("PersistentPointsGameObject").doNotDestroyOnLoad();
    }

    update() {

    }
}

window.StartControllerComponent = StartControllerComponent