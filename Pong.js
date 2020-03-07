const canvas = document.getElementById('Pong');
const context = canvas.getContext('2d');
var position = 30, speed = 10;
var ball = {
    direction: Math.floor(Math.random() * (4 - 1 + 1)) + 1, // (max - min + 1)) - min;
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

//creating objects

function createPaddle(x, y, w, h) {
    context.fillStyle = "white";
    context.beginPath();
    context.fillRect(x, y, w, h);
    context.stroke();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function moveLeftPaddle() {
    createPaddle(30, user.y - 30, 15, 60);
}

function moveRightPaddle() {
    createPaddle(555, ball.y - 30, 15, 60)
    com.y = ball.y;
}

function drawBall(x, y) {
    context.fillStyle = "white"
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI);
    context.fill();
}

function Wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}

function resetObjects() {
    clearCanvas();
    createPaddle(30, 30, 15, 60); // left paddle
    createPaddle(555, 30, 15, 60); // right paddle
    drawBall(canvas.width / 2, canvas.height / 2);
    user.y = 30;
    com.y = 30;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.direction = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
}

//handling game render & progress

function render() {
    clearCanvas();
    moveLeftPaddle();
    moveRightPaddle();
    drawBall(ball.x, ball.y);
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
        case rect.bottom - 20:
            if (ball.direction == 3) {
                ball.direction = 4;
            } else {
                ball.direction = 1;
            }
            break;
    }
    switch (ball.x) {
        case 45:
            if (ball.y >= user.y - 30 && ball.y <= (user.y + 60) - 30) {
                if (ball.direction == 3) {
                    ball.direction = 2;
                } else {
                    ball.direction = 1;
                }
            } else {
                com.score++;
                resetObjects();
            }
            break;
        case 555:
            if (ball.y >= com.y - 30 && ball.y <= (com.y + 60) - 30) {
                if (ball.direction == 2) {
                    ball.direction = 3;
                } else {
                    ball.direction = 4;
                }
            } else {
                user.score++;
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
    user.y = event.clientY; // updates player position
}, false);

canvas.addEventListener("click", function() {
    speed--;
});

function game() {
    update();
    render();
}

var gameInterval = setInterval(game, speed);

//function game(event) {
//    update();
//    render(event);
//    window.requestAnimationFrame(game);
//}
//window.requestAnimationFrame(game)