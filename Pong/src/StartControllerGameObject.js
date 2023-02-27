class StartControllerComponent extends Component {
    //start

    update() {

    }
}

class StartControllerGameObject extends GameObject {
    start() {
        this.addComponent(new StartControllerComponent())
    }
}