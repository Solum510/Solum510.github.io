class PlayerComponent extends Component {
    name = "PlayerComponent"
    speed = 20
    start() { }
    update() {
        if (keysDown["ArrowRight"]) {
            this.transform.x += this.speed * Time.deltaTime
        }
        if (keysDown["ArrowLeft"]) {
            this.transform.x -= this.speed * Time.deltaTime
        }
    }
}

class ControllerComponent extends Component {
    //0 - No tracking
    //1 - Fixed tracking
    //2 - Boundary tracking
    //3 - Momentum tracking
    //4 - Momentum bondary tracking
    method = 0

    start() {
        Camera.main.fillStyle = "gray"
        console.log(Camera.main.fillStyle)
    }

    update() {
        if (keysDown["0"]) {
            this.method = 0
        }
        if (keysDown["1"]) {
            this.method = 1
        }
        if (keysDown["2"]) {
            this.method = 2
        }
        if (keysDown["3"]) {
            this.method = 3
        }
        if (keysDown["4"]) {
            this.method = 4
        }

        let tracker
        if (this.method == 0) return;

        let x = 0;
        if (this.method == 1) {
            tracker = GameObject.getObjectByName("FixedTrackerGameObject")
        }
        if (this.method == 2) {
            tracker = GameObject.getObjectByName("BoundaryTrackerGameObject")
        }
        if (this.method == 3) {
            tracker = GameObject.getObjectByName("MomentumTrackerGameObject")
        }
        if (this.method == 4) {
            tracker = GameObject.getObjectByName("MomentumBoundaryTrackerGameObject")
        }

        Camera.main.transform.x = tracker.transform.x;

    }
}

class FixedTrackerComponent extends Component {
    name = "FixedTrackerComponent"
    update() {
      let playerGameObject = GameObject
        .getObjectByName("PlayerGameObject")
        .getComponent("PlayerComponent")
      let difference = playerGameObject.transform.x - this.transform.x;
      this.transform.x += difference
    }
  }
class BoundaryTrackerComponent extends Component {
    name = "BoundaryTrackerComponent"
    update() {
        let playerGameObject = GameObject.getObjectByName("PlayerGameObject")

        let maxDifference = 10
        let difference = playerGameObject.transform.x - this.transform.x

        if (difference > maxDifference) {
            this.transform.x += difference - maxDifference
        }
        else if (difference < -maxDifference) {
            this.transform.x += difference + maxDifference
        }
    }
}

class MomentumTrackerComponent extends Component {
    name = "MomentumTrackerComponent"
    update() {
        let playerGameObject = GameObject.getObjectByName("PlayerGameObject")

        let difference = playerGameObject.transform.x - this.transform.x

        this.transform.x += .1 * difference
    }
}

class MomentumBoundaryTrackerComponent extends Component {
    name = "MomentumBoundaryTrackerComponent"
    update() {
        let playerGameObject = GameObject.getObjectByName("PlayerGameObject")

        let maxDifference = 10
        let difference = playerGameObject.transform.x - this.transform.x

        if (difference > maxDifference) {
            this.transform.x += .1 * (difference - maxDifference)
        }
        else if (difference < -maxDifference) {
            this.transform.x += .1 * (difference + maxDifference)
        }
    }
}


class CameraTrackingScene extends Scene {
    start() {
        this.addGameObject(
            new GameObject("BoxGameObject")
                .addComponent(new Rectangle("pink")),
            new Vector2(0, 0),
            new Vector2(20, 20))

        this.addGameObject(
            new GameObject("PlayerGameObject")
                .addComponent(new PlayerComponent())
                .addComponent(new Rectangle("blue")),
            new Vector2(0, 0),
            new Vector2(10, 10))

        this.addGameObject(
            new GameObject("ControllerGameobject")
                .addComponent(new ControllerComponent()))


        this.addGameObject(
            new GameObject("FixedTrackerGameObject")
                .addComponent(new FixedTrackerComponent())
                .addComponent(new Rectangle("Green")),
            new Vector2(0, 0), new Vector2(2, 2))

        this.addGameObject(
            new GameObject("BoundaryTrackerGameObject")
                .addComponent(new BoundaryTrackerComponent())
                .addComponent(new Rectangle("Red")),
            new Vector2(0, 0), new Vector2(2, 2))

        this.addGameObject(
            new GameObject("MomentumTrackerGameObject")
                .addComponent(new MomentumTrackerComponent())
                .addComponent(new Rectangle("Black")))

        this.addGameObject(
            new GameObject("MomentumBoundaryTrackerGameObject")
                .addComponent(new MomentumBoundaryTrackerComponent())
                .addComponent(new Rectangle("White")))

        let font = "5px Arial"
        let y = -75
        let margin = 7

        this.addGameObject(
            new GameObject("HelperText0")
                .addComponent(new Text("0 - Disable Tracking", "white", font)),
            new Vector2(-50, y))

        this.addGameObject(
            new GameObject("HelperText1")
                .addComponent(new Text("1 - Fixed Tracking (green)", "white", font)),
            new Vector2(-50, y + margin * 1))

        this.addGameObject(
            new GameObject("HelperText2")
                .addComponent(new Text("2 - Boundary Tracking (red)", "white", font)),
            new Vector2(-50, y + margin * 2))

        this.addGameObject(
            new GameObject("HelperText3")
                .addComponent(new Text("3 - Momentum Tracking (black)", "white", font)),
            new Vector2(-50, y + margin * 3))

        this.addGameObject(
            new GameObject("HelperText4")
                .addComponent(new Text("4 - Boundary+Momentum Tracking (white)", "white", font)),
            new Vector2(-50, y + margin * 4))

    }
}

export default new CameraTrackingScene()