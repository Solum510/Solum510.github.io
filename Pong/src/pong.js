//stage specs
let margin = 20;
let size = 200;

//brick stuff
let bheight = 10;
let bsize = size / 5;
let bmargin = bsize / 5; //this should allow for 4? bricks. add margin to both sides.

let bricks = [{
    bx: margin + bmargin,
    by: margin + bmargin
},]
let initflag = true;

function initBricks() {
    initflag = false;
    for (let i = 1; i < 16; i++) {
        if (i % 4 == 0) {
            //new row
            bricks.push({
                bx: margin + bmargin,
                by: bricks[i - 1].by + bheight + bmargin
            });
        } else {
            bricks.push({
                bx: bricks[i - 1].bx + bsize + bmargin,
                by: bricks[i - 1].by
            });
        }
    }
    //console.log(bricks);
}

function checkBricks() {
    let hit = false;
    for(let i = 0; i < bricks.length; i++) {
        if(pongx >= bricks[i].bx && pongx <= bricks[i].bx + bsize) { //top or bottom
            if(pongy == bricks[i].by) { //top
                hit = true;
                pongVY = -Math.abs(pongVY);
            } else if(pongy == bricks[i].by + bheight) { //bottom
                hit = true;
                pongVY = -Math.abs(pongVY);
            }
        } else if(pongy >= bricks[i].by && pongy <= bricks[i].by + bheight) { //left or right side
            if(pongx == bricks[i].bx) { //left
                hit = true;
                pongVX = -Math.abs(pongVX);

            } else if(pongx == bricks[i].bx + bsize){ //right
                hit = true;
                pongVX = -Math.abs(pongVX);
            }
        }
    }
}



//paddle
let px = margin + size / 2;
let pwidth = size / 3;

//score
let score = 0;
let highscores = [];


//cirlce start
let pongx = margin + size / 2;
let pongy = margin + size / 2;

//circle velocity
let pongVX = 4;
let pongVY = 3;


function handleGO() {
    highscores.push(score);
    highscores.sort();
    highscores.reverse();
    isPaused = false;
    px = margin + size / 2;
    score = 0;
    pongx = margin + size / 2;
    pongy = margin = size / 2;
    pongVX = 3;
    pongVY = 2;
    bricks = [{
        bx: margin + bmargin,
        by: margin + bmargin
    },];
    initBricks();
}

function updatePlay() {
    //move ball
    pongx += pongVX;
    pongy += pongVY;

    //move paddle
    //px += pv;


    if (pongx + pongVX > margin + size) {
        pongVX *= -1
    }
    if (pongy + pongVY > margin + (size * 1.5)) { //bottom collision
        if (pongx > px - pwidth / 2 && pongx < px + pwidth / 2) {
            pongVY = -Math.abs(pongVY);
            score++;
        } else { //GAME OVER
            //die
            sceneIndex = 2;
            handleGO();
        }
        //pongVY *= -1
    }
    if (pongx + pongVX < margin) {
        pongVX *= -1
    }
    if (pongy + pongVY < margin) {
        pongVY *= -1
    }

    //moving the paddle the way we do it in class
    //pull keyboard state + move paddle
    if (keysDown["ArrowRight"]) {
        px += 4;
    }
    if (keysDown["ArrowLeft"]) {
        px -= 4;
    }
    if (px - pwidth / 2 < margin) {
        px = margin + pwidth / 2;
    }
    if (px + pwidth / 2 > size + margin) {
        px = size + margin - pwidth / 2;
    }
}

function update() {
    //model of mvc
    //console.log(keysDown)
    if (sceneIndex == 0) {
        //game start screen
        if(initflag){
            initBricks();
        }
    } else if (sceneIndex == 1) {
        updatePlay();
    }
}


function drawStart() {
    ctx.font = "50px serif";
    ctx.fillText("Pong", 10, 50);
    ctx.font = "25px serif";
    ctx.fillText("S - start game", 10, 80);
    ctx.fillText("H - high scores", 10, 100);
}

function drawGO() {
    ctx.font = "50px serif";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", 10, 50);
    ctx.font = "25px serif";
    ctx.fillStyle = "black";
    ctx.fillText("S - restart game", 10, 80);
    ctx.fillText("H - high scores", 10, 100);
}

function drawHS() {
    ctx.font = "50px serif";
    ctx.fillStyle = "lime";
    ctx.fillText("HIGH SCORES", 10, 50);
    ctx.font = "25px serif";
    ctx.fillStyle = "black";
    ctx.fillText("H - back to start", 10, 80);
    let startY = 100;
    for (let i = 0; i < 10; i++) {
        if (!(typeof highscores[i] === 'undefined')) { //i found this if statement on a stack overflow page
            ctx.fillText(i + 1 + ". " + highscores[i], 10, startY + 20 * i);
        }
    }
}

function drawBricks() {
    ctx.fillStyle = "#9e4039";
    for (let i = 0; i < bricks.length; i++) {
        ctx.fillRect(bricks[i].bx, bricks[i].by, bsize, bheight);
    }
}

function drawPlay() {
    //clear the canvas, i know this isn't how we did it in class but i googled it before we got there
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //how we did it in class
    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw a box
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin + size, margin); //right 
    ctx.lineTo(margin + size, margin + (size * 1.5)); //down 
    ctx.moveTo(margin, margin + (size * 1.5)); //bottom
    ctx.lineTo(margin, margin); //up
    ctx.stroke();

    //draw bricks
    //ctx.fillRect(bricks[0].bx, bricks[0].by, bsize, bheight);
    drawBricks();

    //draw circle
    ctx.fillStyle = "blue"
    ctx.beginPath();
    ctx.arc(pongx, pongy, 5, 0, 2 * Math.PI);
    ctx.fill();

    //paddle time
    ctx.beginPath();
    ctx.moveTo(px - pwidth / 2, (size * 1.5) + margin);
    ctx.lineTo(px + pwidth / 2, (size * 1.5) + margin);
    ctx.stroke();

    //draw score
    ctx.font = "25px serif";
    ctx.fillText(score, margin + size + margin, margin + size + margin);



    //pause instructions
    ctx.fillText("P - pause game", margin + size + margin, margin + size + margin + 30);
    //show the game is paused to prevent user confusion
    if (isPaused) {
        ctx.font = "100px serif";
        ctx.fillStyle = "red";
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
        ctx.font = "50px serif";
        ctx.fillText("P - unpause game", canvas.width / 2, 50 + canvas.height / 2);
    }
}

function draw() {

    //view of mvc
    
    if (sceneIndex == 0) { //start
        drawStart();
    } else if (sceneIndex == 1) { //play 
        drawPlay();
    } else if (sceneIndex == 2) { //game over
        drawGO();
    } else if (sceneIndex == 3) { //high scores
        drawHS();
    }
}