const canvas = document.getElementById('Pong'); // canvas HTML element
const context = canvas.getContext('2d'); // context for canvas
const body = document.getElementById('body'); // body HTML element
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

function moveLeftPaddle() {
    drawPaddle(30, user.y - 30, 15, 60);
}

function moveRightPaddle() {
    drawPaddle(555, algorithm() - 30, 15, 60)
    //com.y = ball.y; // position computer paddle over ball's y position
    //if (ball.y >= 30 && ball.y <= 370) {

    //}
}

function drawBall(x, y) {
    context.fillStyle = "white"
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
    ball.direction = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
}

// com play algorithm

function algorithm() { // returns position
    if (ball.y >= 30 && ball.y <= 370) {
        com.y = ball.y;
        return com.y;
    }
    return com.y;


    

    //********************************
    //* com just starts freaking out *
    //********************************

    //if (ball.x >= 500) {
    //    var rndPos = Math.floor(Math.random() * (60 - 1 + 1)) + 1;
    //    com.y = (ball.y - 30) + rndPos;
    //    return com.y;
    //} else {
    //    com.y = ball.y - 30;
    //    return com.y;
    //}

    // ******************************
    // * deflect to opposite corner *
    // ******************************
    
    //if (user.y >= (canvas.height / 2) + 100) {
    //    com.y = (ball.y + 25);
    //} else if (user.y <= (canvas.height / 2) - 100) {
    //    com.y = (ball.y - 25); 
    //} else {
    //    com.y = ball.y;
    //}
    //return com.y
}









//handling game render & progress

function render() {
    clearCanvas();
    moveLeftPaddle();
    moveRightPaddle();
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
        case rect.bottom - 15:
            if (ball.direction == 3) {
                ball.direction = 4;
            } else {
                ball.direction = 1;
            }
            break;
    }
    switch (ball.x) {
        case 40:
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
            } else {
                com.score++;
                UpdateComScore(com.score);
                resetObjects();
            }
            break;
        case 560:
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
            } else {
                user.score++;
                UpdateUserScore(user.score);
                resetObjects();
            }
            break;
    }
}

function update() {
    switch (ball.direction) {
        case 1:
            ball.y--;
            ball.x++;
            break;
        case 2:
            ball.x++;
            ball.y++;
            break;
        case 3:
            ball.y++;
            ball.x--;
            break;
        case 4:
            ball.x--;
            ball.y--;
            break;
    }
    ballCollision();
}

//handling game loop

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
var gameInterval = setInterval(game, 6);