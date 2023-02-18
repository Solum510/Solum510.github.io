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
    if (isPaused) return
    if(SceneManager.changedSceneFlag && SceneManager.getActiveScene().start){
        SceneManager.getActiveScene().start();
        SceneManager.changedSceneFlag = false;
    }
    SceneManager.getActiveScene().update()
}

function engineDraw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    SceneManager.getActiveScene().draw(ctx)
}

function start(title) {
    document.title = title;
    function gameLoop() {
        engineUpdate()
        engineDraw()
    }

    setInterval(gameLoop, 1000 / 25)
}