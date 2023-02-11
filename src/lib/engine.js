let canvas = document.getElementById("canv");
let ctx = canvas.getContext("2d");


//tell javascript you care about keyboard input
let keysDown = []
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);


//gameStates
let isPaused = false;
let sceneIndex = 0; //0 = open, 1 = run, 2 = die, 3 = highscores

function keyDown(e) {
    // console.log(e);
    keysDown[e.key] = true;
}

function keyUpStart(e) {
    if (e.key == "s") {
        sceneIndex = 1;
    }
    if (e.key == "h") {
        sceneIndex = 3;
    }
}

function keyUpPlay(e) {
    if (e.key == "p") {
        isPaused = !isPaused;
    }
}

function keyUpGO(e) {
    if (e.key == "s") {
        sceneIndex = 0;
    }
    if (e.key == "h") {
        sceneIndex = 3;
    }
}

function keyUpHS(e) {
    if (e.key == "h") {
        sceneIndex = 0;
    }
}

function keyUp(e) {
    keysDown[e.key] = false;
    if (sceneIndex == 0) { //game is at start screen
        keyUpStart(e);
    } else if (sceneIndex == 1) { //game is at play screen
        keyUpPlay(e);
    } else if (sceneIndex == 2) { //game is at game over screen
        keyUpGO(e);
    } else if (sceneIndex == 3) { //game is at high score screen
        keyUpHS(e);
    }

}

function engineUpdate() {
    if (isPaused) return
    update()
}

function engineDraw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw()
}

function start(title) {
    document.title = title;
    function gameLoop() {
        engineUpdate()
        engineDraw()
    }

    setInterval(gameLoop, 1000 / 25)
}