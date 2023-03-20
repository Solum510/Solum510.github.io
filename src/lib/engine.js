import "./GameObject.js"
import "./Scene.js"
import "./SceneManager.js"
import "./components/Component.js"
import "./components/Transform.js"

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