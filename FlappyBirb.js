const canvas = document.getElementById('canvas');
const body = document.getElementById('body');
const context = canvas.getContext('2d');

var leftMostPole = 100;
var topHeightValues = [Math.floor(Math.random() * 71), Math.floor(Math.random() * 71), Math.floor(Math.random() * 71)];
var player = {
    x: 30,
    y: 50,
    score: 0
}

//create player
function createPlayer(x, y) {
    //bird body
    createBirdBody(x, y);
    //eye
    createBirdEye(x, y);
    //beak
    createBirdBeak(x, y);
}

function createBirdBody(x, y) {
    context.beginPath();
    context.fillStyle = "yellow";
    context.arc(x, y, 8, 0, 2 * Math.PI);
    context.fill();
}

function createBirdEye(x, y) {
    context.beginPath();
    context.fillStyle = "black";
    context.arc(x + 2, y + -3, 2, 0, 2 * Math.PI);
    context.fill();
}

function createBirdBeak(x, y) {
    // the triangle
    x += 7;
    y -= 4;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 8, y + 5);
    context.lineTo(x, y + 8);
    // the fill colour
    context.fillStyle = "orange";
    context.fill();
}

//poles

//new instance of poles

function createNewPoles(x, topHeight) {
    var rect = canvas.getBoundingClientRect();
    var bottomHeight = topHeight + 50;
    context.fillStyle = "green";
    context.beginPath();
    //top pole
    context.fillRect(x, 0, 20, topHeight);
    //bottom pole
    context.fillRect(x, bottomHeight, 20, rect.bottom - bottomHeight);
    //context.fillRect(x, 0, 20, topHeight)
    context.fill();
}

function movePoles() {
    if (leftMostPole > 0) {
        leftMostPole--;
    } else {
        leftMostPole = 100; 
        topHeightValues[0] = topHeightValues[1];
        topHeightValues[1] = topHeightValues[2];
        topHeightValues[2] = Math.floor(Math.random() * 71);
    }
}
 
function createPoles() {
    createNewPoles(leftMostPole, 15 + topHeightValues[0]);
    createNewPoles(leftMostPole + 100, 15 + topHeightValues[1]);
    createNewPoles(leftMostPole + 200, 15 + topHeightValues[2]);
}

//pole collision detection

function poleCollisionDetection() {
    if (player.x >= leftMostPole && player.x <= leftMostPole + 20) {
        if (player.y - 8 < topHeightValues[0] + 15 || player.y + 8 > topHeightValues[0] + 65) {
            resetGame();
        }
    }
}

//display & update score

function checkForUpdatedScore() {
    if (player.x == leftMostPole + 10) {
        player.score++;
    }
}

function updateScore() {
    context.fillStyle = "black";
    context.font = "18px Arial";
    context.fillText(player.score, (canvas.width / 2) - 5, 20);
}

// update, render & reset

function game() {
    update();
    render();
}

function update() {
    player.y++;
    bounderyTop();
    bounderyBottom();
    poleCollisionDetection();
    checkForUpdatedScore();    
    movePoles();
}

function render() {
    clearCanvas();
    createPlayer(player.x, player.y);
    createPoles();
    updateScore();
}

function bounderyTop() {
    var rect = canvas.getBoundingClientRect();
    if (player.y <= rect.top) {
        player.y = rect.top;
    }
}

function bounderyBottom() {
    var rect = canvas.getBoundingClientRect();
    if (player.y >= rect.top + canvas.height - 16) {
        resetGame();
    }
}

function resetGame() {
    clearInterval(gameInterval);
    player.y = 50;
    leftMostPole = 100
    for (var i = 0; i < 3; i++) {
        topHeightValues[i] = Math.floor(Math.random() * 71);
    }
    player.score = 0;
    gameInterval = setInterval(game, 1000/ 40);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height); // creates filled rectangle over the canvas screen to clear the screen
}

//movement

body.addEventListener('keypress', function() {
    if (event.which == 32) {
        player.y -= 15;
    }
});
body.addEventListener('mousedown', function() {
    if (event.which == 1) {
        player.y -= 15;
    }
})

//game loop

var gameInterval = setInterval(game, 1000/ 40);
