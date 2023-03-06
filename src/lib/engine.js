class SceneManager{
    static scenes = [];
    static currentSceneIndex = 0;
    static changedSceneFlag = true;   
    
    
    static addScene(scene){
        SceneManager.scenes.push(scene);
    }

    static getActiveScene(){
        return SceneManager.scenes[SceneManager.currentSceneIndex];
    }

    static changeScene(index){
        SceneManager.currentSceneIndex = index;
        SceneManager.changedSceneFlag = true;
    }
}


class Scene {
    gameObjects = []
    addGameObject(gameObject){
        this.gameObjects.push(gameObject);
        if(gameObject.start && !gameObject.started){
            gameObject.started = true
            gameObject.start()
        }
    }
}


class GameObject{
    name = ""
    components = []
    started = false
    constructor(name){
        this.name = name;
        this.addComponent(new Transform());
    }

    get transform(){
        return this.components[0]
    }

    addComponent(component){
        this.components.push(component);
        component.parent = this;
        return this;
    }
    static getObjectByName(name){
        return SceneManager.getActiveScene().gameObjects.find(gameObject=>gameObject.name == name)
    }
    getComponent(name){
        return this.components.find(c=>c.name == name)
    }
}



class Component{
    name = ""
    parent
    started = false

    get transform(){
        return this.parent.components[0]
    }
}

class Transform extends Component {
    name = "Transform"
    x = 0
    y = 0
    sx = 1
    sy = 1
    r = 0
}

let canvas = document.getElementById("canv");
let ctx = canvas.getContext("2d");


//tell javascript you care about keyboard input
let keysDown = []
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);


//gameStates
let isPaused = false;

function keyDown(e) {
    // console.log(e);
    keysDown[e.key] = true;
}


function keyUp(e) {
    keysDown[e.key] = false;
    SceneManager.getActiveScene().keyUp(e);

}

function engineUpdate() {
    if(isPaused) return
    let scene = SceneManager.getActiveScene()
    if (SceneManager.changedSceneFlag && scene.start) {
        scene.gameObjects = []
        scene.start()
        SceneManager.changedSceneFlag = false
    }
    
    for(let gameObject of scene.gameObjects){
        if(gameObject.start && !gameObject.started){
            gameObject.start()
            gameObject.started = true
        }
    }

    for(let gameObject of scene.gameObjects){
        for(let component of gameObject.components){
            if(component.start && !component.started){
                component.start()
                component.started = true
            }
        }
    }


    for(let gameObject of scene.gameObjects){
        for(let component of gameObject.components){
            if(component.update){
                component.update()
            }
        }
    }

    

}

function engineDraw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    let scene = SceneManager.getActiveScene()
    
    for(let gameObject of scene.gameObjects){
        for(let component of gameObject.components){
            if(component.draw){
                component.draw(ctx)
            }
        }
    }
}

function start(title) {
    document.title = title;
    function gameLoop() {
        engineUpdate()
        engineDraw()
    }

    setInterval(gameLoop, 1000 / 25)
}