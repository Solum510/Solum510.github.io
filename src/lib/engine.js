import "./components/SceneManager.js"
import "./components/Component.js"
import "./components/Scene.js"
import "./GameObject.js"
import "./components/Transform.js"
import "./components/Circle.js"
import "./components/Camera.js"
import "./components/Rectangle.js"
import "./components/GUIRectangle.js"
import "./components/GUIText.js"
import "./components/GUITextCentered.js"
import "./components/ScreenRectangle.js"
import "./components/Line.js"
import "./components/Text.js"
import "./components/Vector2.js"
import "./components/Time.js"
import "./components/Input.js"
import "./components/CameraMover.js"
import "./components/Point.js"


class EngineGlobals {
    static requestedAspectRatio = 16/9
    static logicalWidth = 1
}

window.EngineGlobals = EngineGlobals


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

function gameLoop() {
    update()
    draw()
}

function update() {
    if(isPaused) return

    Time.update()
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

    Input.finishFrame()

}

let letterboxColor = "grey"
// let aspectRatio = 16/9
// let logicalWidth = 300

function draw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    

    ctx.fillStyle = Camera.main.fillStyle
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    let currentAspectRatio = canvas.width/canvas.height;
    let offsetX = 0;
    let offsetY = 0;
    let actualWidth = canvas.width
    if(EngineGlobals.requestedAspectRatio > currentAspectRatio){
        let desiredHeight = canvas.width/EngineGlobals.requestedAspectRatio
        let amount = (canvas.height - desiredHeight)/2;
        offsetY = amount
    } else {
        let desiredWidth = canvas.height * EngineGlobals.requestedAspectRatio
        let amount = (canvas.width-desiredWidth) /2
        offsetX = amount
        actualWidth -= 2*amount
    }

    let scene = SceneManager.getActiveScene()
    
    ctx.save();
    let logicalScale = Camera.getLogicalScaleZoomable(ctx)
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2)
    ctx.scale(logicalScale,logicalScale)

    ctx.translate(-Camera.main.transform.x, -Camera.main.transform.y)


    let min = scene.gameObjects.filter(go => go.components.some(c=>c.draw))
    .map(go => go.layer)
    .reduce((previous,current)=>Math.max(previous, current),0)

    let max = scene.gameObjects.filter(go=>go.components.some(c=>c.draw))
    .map(go => go.layer)
    .reduce((previous, current)=>Math.max(previous, current),0)

    for(let i = min; i <= max; i++){
        let gameObjects = scene.gameObjects.filter(go=>go.layer==i)
        for(let gameObject of scene.gameObjects){
            for(let component of gameObject.components){
                if(component.draw){
                    component.draw(ctx)
                }
            }
        }
    }
    

    ctx.restore();

    let zeroX = 0
    let zeroY = 0

    if(EngineGlobals.requestedAspectRatio > currentAspectRatio){
        let desiredHeight = canvas.width/EngineGlobals.requestedAspectRatio;
        let amount = (canvas.height-desiredHeight)/2;
        zeroY = amount
        ctx.fillStyle = letterboxColor
        ctx.fillRect(0,0,canvas.width, amount);
        ctx.fillRect(0,canvas.height-amount,canvas.width, amount);
    }
    else{
        let desiredWidth = canvas.height * EngineGlobals.requestedAspectRatio
        let amount = (canvas.width-desiredWidth)/2;
        zeroX = amount
        ctx.fillStyle = letterboxColor
        ctx.fillRect(0,0,amount, canvas.height);
        ctx.fillRect(canvas.width-amount,0,amount, canvas.height);
    }

    let logicalScaling = Camera.getLogicalScale(ctx) 
    min = scene.gameObjects.filter(go=>go.components.some(c=>c.drawGUI))
    .map(go => go.layer)
    .reduce((previous,current)=>Math.min(previous,current),0)

    max = scene.gameObjects.filter(go=>go.components.some(c=>c.drawGUI))
    .map(go => go.layer)
    .reduce((previous, current)=>Math.max(previous, current),0)

    ctx.save();
    ctx.translate(zeroX, zeroY)
    ctx.scale(logicalScaling, logicalScaling);
    for (let i = min; i <= max; i++) {
        let gameObjects = scene.gameObjects.filter(go=>go.layer==i)

        for (let gameObject of gameObjects) {
            for (let component of gameObject.components) {
                if (component.drawGUI) {
                    component.drawGUI(ctx)
                }
            }
        }
    }
    ctx.restore();

    ctx.save();
    min = scene.gameObjects.filter(go=>go.components.some(c=>c.drawScreen))
    .map(go => go.layer)
    .reduce((previous, current)=>Math.min(previous, current),0)

     max = scene.gameObjects.filter(go=>go.components.some(c=>c.drawScreen))
    .map(go => go.layer)
    .reduce((previous, current)=>Math.max(previous, current),0)

    ctx.save();
    for (let i = min; i <= max; i++) {
        let gameObjects = scene.gameObjects.filter(go=>go.layer==i)

        for (let gameObject of gameObjects) {
            for (let component of gameObject.components) {
                if (component.drawScreen) {
                    component.drawScreen(ctx)
                }
            }
        }
    }
    ctx.restore();
}

function start(title, settings = {}) {

    Input.start()

    canvas.width = window.innerWdith 
    canvas.height = window.innerHeight
    document.title = title;

    if(settings) {
        console.log(settings)
        EngineGlobals.requestedAspectRatio = settings.aspectRatio ? settings.aspectRatio : 16 / 9
        letterboxColor = settings.letterboxColor ? settings.letterboxColor : "black"
        EngineGlobals.logicalWidth = settings.logicalWidth ? settings.logicalWidth : 100
    }

    console.log(EngineGlobals.logicalWidth)
    setInterval(gameLoop, 1000 * Time.deltaTime)
}

window.start = start
window.keysDown = keysDown
window.isPaused = isPaused