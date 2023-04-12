import "./components/Camera.js"
import "./components/Circle.js"
import "./components/Component.js"
import "./components/Line.js"
import "./components/Rectangle.js"
import "./components/Text.js"
import "./components/Transform.js"
import "./components/Vector2.js"
import "./GameObject.js"
import "./Scene.js"
import "./SceneManager.js"


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
    console.log(e.key)
    if (e.key == "p") {
        isPaused = !isPaused;
    }
    SceneManager.getActiveScene().keyUp(e);

}

function engineUpdate() {
    if(isPaused) return
    let scene = SceneManager.getActiveScene()
    if (SceneManager.changedSceneFlag && scene.start) {
        let camera = scene.gameObjects[0]
        scene.gameObjects = []
        scene.gameObjects.push(camera)

        let previousScene = SceneManager.getPreviousScene()
        if(previousScene) {
            for(let gameObject of previousScene.gameObjects){
                if(gameObject.markedDoNotDestroyOnLoad){
                    scene.gameObjects.push(gameObject)
                }
            }
        }
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

    let keptGameObjects = []
    for(let gameObject of scene.gameObjects) {
        if(!gameObject.markedForDestroy){
            keptGameObjects.push(gameObject)
        }
    }

    scene.gameObjects = keptGameObjects;


    for(let gameObject of scene.gameObjects){
        for(let component of gameObject.components){
            if(component.update){
                component.update()
            }
        }
    }

    

}

let aspectRatio = 16/9
let logicalWidth = 300

function engineDraw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    

    ctx.fillStyle = Camera.main.getComponent("Camera").fillStyle
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    let currentAspectRatio = canvas.width/canvas.height;
    let offsetX = 0;
    let offsetY = 0;
    let actualWidth = canvas.width
    if(aspectRatio > currentAspectRatio){
        let desiredHeight = canvas.width/aspectRatio
        let amount = (canvas.height - desiredHeight)/2;
        offsetY = amount
    } else {
        let desiredWidth = canvas.height * aspectRatio
        let amount = (canvas.width-desiredWidth) /2
        offsetX = amount
        actualWidth -= 2*amount
    }

    let scene = SceneManager.getActiveScene()
    
    ctx.save();
    ctx.translate(offsetX,offsetY)
    let logicalScale = actualWidth/logicalWidth
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2)
    ctx.scale(logicalScale,logicalScale)

    ctx.translate(-Camera.main.transform.x, -Camera.main.transform.y)
    for(let gameObject of scene.gameObjects){
        for(let component of gameObject.components){
            if(component.draw){
                component.draw(ctx)
            }
        }
    }

    ctx.restore();
    if(aspectRatio > currentAspectRatio){
        let desiredHeight = canvas.width/aspectRatio;
        let amount = (canvas.height-desiredHeight)/2;
        ctx.fillStyle = "black"
        ctx.fillRect(0,0,canvas.width, amount);
        ctx.fillRect(0,canvas.height-amount,canvas.width, amount);
    }
    else{
        let desiredWidth = canvas.height * aspectRatio
        let amount = (canvas.width-desiredWidth)/2;
        ctx.fillStyle = "black"
        ctx.fillRect(0,0,amount, canvas.height);
        ctx.fillRect(canvas.width-amount,0,amount, canvas.height);
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

window.start = start
window.keysDown = keysDown
window.isPaused = isPaused