class ScoreSetterComponent extends Component {
    name = "ScoreSetterComponent"
    start() {
        this.maxScoreComponent = this.parent.getComponent("Text");
    }
    update() {
        let persistentPointsGameObject = GameObject.getObjectByName("PersistentPointsGameObject");

        if (persistentPointsGameObject) {

            this.maxScoreComponent.string = "Max Score: "

            let persistentPointsComponent = persistentPointsGameObject
                .getComponent("PersistentPointsComponent")

            this.maxScoreComponent.string += persistentPointsComponent.points
        }
    }
}

window.ScoreSetterComponent = ScoreSetterComponent