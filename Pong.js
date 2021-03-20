const canvas = document.getElementById('Pong'); // canvas HTML element
const context = canvas.getContext('2d'); // context for canvas
const body = document.getElementById('body'); // body HTML element
var speed = 60;
var difficulty = 3.25;
var ball = {
    direction: Math.floor(Math.random() * (4 - 1 + 1)) + 1, // (max - min + 1)) + min;
    x: canvas.width / 2,
    y: canvas.height / 2
}
var user = {
    y: 30,
    score: 0

}
var com = {
    y: 30,
    score: 0
}
const net = {
    x: canvas.width/ 2 - 2/ 2,
    y: 0,
    width: 2,
    height: 10,
    colour: "white"
}

//creating objects

function drawPaddle(x, y, w, h) {
    context.fillStyle = "white";
    context.beginPath();
    context.fillRect(x, y, w, h);
    context.stroke();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height); // creates filled rectangle over the canvas screen to clear the screen
}

function drawBall(x, y) {
    context.fillStyle = "white";
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI); // creates ball
    context.fill();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i+=15) {
        context.fillRect(net.x, net.y + i,net.width, net.height, net.colour);
    }
}

//score

function UpdateUserScore(score) {
    context.font = "30px Arial";
    context.fillText(score, 200, 30);
}

function UpdateComScore(score) {
    context.font = "30px Arial";
    context.fillText(score, 385, 30);
}

function Wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}

function resetObjects() {
    clearCanvas();
    drawPaddle(30, 30, 15, 60); // left paddle
    drawPaddle(555, 30, 15, 60); // right paddle
    drawBall(canvas.width / 2, canvas.height / 2);
    UpdateComScore(com.score);
    UpdateUserScore(user.score);
    user.y = 60;
    com.y = 60;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.direction = Math.floor(Math.random() * (4 - 3 + 1)) + 3;
    clearInterval(gameInterval);
    speed = 60;
    gameInterval = setInterval(game, 1000 / speed);
}

// com play algorithm

var prevPos = 0;
function algorithm() { // returns position
    if (ball.y >= 20 && ball.y <= 380) {
        if (ball.x >= 425 && (ball.direction == 1 || ball.direction == 2)) {
            if (ball.y > com.y) {
                com.y += difficulty;
            } else {
                com.y -= difficulty;
            }
        }
        return com.y;
    }
    return com.y;
}

//handling game render & progress

function render() {
    clearCanvas();
    drawPaddle(30, user.y - 30, 15, 60);
    drawPaddle(555, algorithm() - 30, 15, 60);
    drawBall(ball.x, ball.y);
    drawNet();
    UpdateComScore(com.score);
    UpdateUserScore(user.score);
}

function ballCollision() {
    var rect = canvas.getBoundingClientRect();
    switch (ball.y) {
        case rect.top:
            if (ball.direction == 1) {
                ball.direction = 2;
            } else {
                ball.direction = 3;
            }
            break;
        case rect.bottom - 14:
            if (ball.direction == 3) {
                ball.direction = 4;
            } else {
                ball.direction = 1;
            }
            break;
    }
    switch (ball.x) {
        case 558:
            if (ball.y >= com.y - 30 && ball.y <= (com.y + 60) - 30) {
                //same direction
                if (ball.y >= com.y - 30 && ball.y <= (com.y + 15) - 30) {
                     ball.direction = 4;
                } else if (ball.y >= (com.y + 45) - 30 && ball.y <= (com.y + 60) - 30) {
                     ball.direction = 3;
                } else {
                    //bounce
                    if (ball.direction == 2) {
                    ball.direction = 3;
                    } else {
                    ball.direction = 4;
                    }
                }
                paddleBounce();
            }
            break;
        case 48:
            if (ball.y >= user.y - 30 && ball.y <= (user.y + 60) - 30) {
                //same direction
                if (ball.y >= user.y - 30 && ball.y <= (user.y + 15) - 30) {
                    ball.direction = 1;                
                } else if (ball.y >= (user.y + 45) - 30 && ball.y <= (user.y + 60) - 30) {
                    ball.direction = 2;
                } else {
                    //bounce
                    if (ball.direction == 3) {
                        ball.direction = 2;
                    } else {
                        ball.direction = 1;
                    }
                }
                paddleBounce();
            }
            break;        
        case 30:
            com.score++;
            UpdateComScore(com.score);
            resetObjects();
            break;
        case 570:
            user.score++;
            UpdateUserScore(user.score);
            resetObjects();
            break;
    }
}

function update() {
    switch (ball.direction) {
        case 1:
            ball.y-=2;
            ball.x+=2;
            break;
        case 2:
            ball.x+=2;
            ball.y+=2;
            break;
        case 3:
            ball.y+=2;
            ball.x-=2;
            break;
        case 4:
            ball.x-=2;
            ball.y-=2;
            break;
    }
    ballCollision();
}

function paddleBounce() {
    clearInterval(gameInterval);
    speed += 5;
    if (speed > 250) {
        speed = 250;
    }
    gameInterval = setInterval(game, 1000 / speed);
}

// buttons

var btnEasy = document.getElementById("btnEasy");
var btnInt = document.getElementById("btnInt");
var btnExp = document.getElementById("btnExp");

btnEasy.addEventListener("click", () => {
    clearBtns();
    btnEasy.style.color = "#86C232";
    difficulty = 3;
    resetObjects();
    com.score = 0;
    user.score = 0;
    UpdateComScore(0);
    UpdateUserScore(0);
});

btnInt.addEventListener("click", () => {
    clearBtns();
    btnInt.style.color = "#86C232";
    difficulty = 3.25;
    resetObjects();
    com.score = 0;
    user.score = 0;
    UpdateComScore(0);
    UpdateUserScore(0);
});

btnExp.addEventListener("click", () => {
    clearBtns();
    btnExp.style.color = "#86C232";
    difficulty = 3.5;
    resetObjects();
    com.score = 0;
    user.score = 0;
    UpdateComScore(0);
    UpdateUserScore(0);
});

function clearBtns() {
    btnEasy.style.color = "#FFFFFF";
    btnInt.style.color = "#FFFFFF";
    btnExp.style.color = "#FFFFFF";
}
 
// handling game loop

canvas.addEventListener('mousemove', function(event) {
    if (event.clientY >= 30 && event.clientY <= 370) {
        user.y = event.clientY; // updates player position
    }
});

body.addEventListener('keypress', function() {
    if (event.which == 87) {
        user.y -= 30;
    } else if (event.which == 83) {
        user.y += 30;
    }
});

function game() {
    update();
    render();
}

resetObjects();
var gameInterval = setInterval(game, 1000 / speed);// speed);