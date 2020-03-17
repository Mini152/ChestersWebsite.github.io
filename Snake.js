const canvas = document.getElementById("canvas"); // canvas element
const context = canvas.getContext("2d"); // 2d context of canvas


var playerX = playerY = 10; // position of player
var gridDimension = 20; // width & height of grid
var appleX = rndNum(), appleY = rndNum(); // random location of apple
var xVelocity = yVelocity = 0; // direction of movement
var trail = []; // holds values of all tail positions
var tail = 5; // length of tail

function rndNum() { //returns rnd num x or y on grid
    return Math.floor(Math.random() * gridDimension); // random number between 1 and 20
}

//rendering, updating & looping game ----------------------

function game() {
    playerX += xVelocity; // increaces playerX by xVelocity
    playerY += yVelocity; // increaces playerY by yVelocity
    checkForLoop();
    render();
}

function checkForLoop() {
    if (playerX < 0) {
        playerX = gridDimension - 1; // loops left to right
    } else if (playerX > gridDimension - 1) {
        playerX = 0; // loops right to left
    } else if (playerY < 0) {
        playerY = gridDimension - 1; // loops top to bottom
    } else if (playerY > gridDimension - 1) {
        playerY = 0; // loops bottom to top
    }
}

function render() {
    //clear canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    //draw on apple
    context.fillStyle = "red";
    context.fillRect(appleX * gridDimension, appleY * gridDimension, gridDimension - 2, gridDimension - 2);
    //draw on snake
    context.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        context.fillRect(trail[i].x * gridDimension, trail[i].y * gridDimension, gridDimension - 2, gridDimension - 2);
        if (trail[i].x == playerX && trail[i].y == playerY) { //if snake eats itself
            tail = 5;
        }
    }
    //add on new value (current x, y) to array
    trail.push({
        x: playerX,
        y: playerY
    });
    //remove last value from array - (this & command above moves snake)
    while (trail.length > tail) {
        trail.shift();
    }
    //if on apple
    if (appleX == playerX && appleY == playerY) {
        tail++;
        appleX = rndNum();
        appleY = rndNum();
    }
}

//handling game running -----------------------------------
function keyPush(evt) {
    switch (evt.keyCode) {
        case 65: // left
            //stops you moving back onto yourself
            if (xVelocity != 1) {
                xVelocity = -1;
                yVelocity = 0;
            }
            break;
        case 87: // up
            //stops you moving back onto yourself
            if (yVelocity != 1) {
                xVelocity = 0;
                yVelocity = -1;
            }
            break;
        case 68: // right
            //stops you moving back onto yourself
            if (xVelocity != -1) {
                xVelocity = 1;
                yVelocity = 0;
            }
            break;
        case 83: // down
            //stops you moving back onto yourself
            if (yVelocity != -1) {
                xVelocity = 0;
                yVelocity = 1;
            }
            break;
    }
}

document.addEventListener("keydown", keyPush);
setInterval(game, 1000 / 15); // 15 fps