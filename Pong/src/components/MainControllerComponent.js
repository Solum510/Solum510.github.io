class MainControllerComponent extends Component {
    start() {
        for (let i = 0; i < 1; i++) {
            //Create a new pong ball
            let ballGameObject = new GameObject("BallGameObject")
            let ballComponent = new BallComponent();
            ballComponent.addListener(this)
            ballComponent.addListener(GameObject.getObjectByName("PointsGameObject").getComponent("PointsComponent"))
            ballGameObject.addComponent(ballComponent)

            let circle = new Circle()
            ballGameObject.addComponent(circle)
            circle.fillStyle = "blue"
            circle.transform.sx = 1.5
            circle.transform.x = -15 * i
            GameObject.instantiate(ballGameObject)
        }
    }
    handleUpdate(component, eventName) {
        if (eventName == "BallOutOfBounds") {
            //Check to see if there are any more pong balls in play
            let ballGameObjects = GameObject.getObjectsByName("BallGameObject")
            let countLive = 0;
            for (let ballGameObject of ballGameObjects) {
                if (!ballGameObject.markedForDestroy) {
                    countLive++;
                }
            }
            if (countLive == 0) {
                SceneManager.changeScene(2)
            }
        }
    }
}

window.MainControllerComponent = MainControllerComponent