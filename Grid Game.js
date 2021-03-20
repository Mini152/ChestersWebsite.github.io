const container = document.getElementById("container");
var foodPosition, playerPosition, energy = 100, score = 0;

function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        //cell.innerText = (c + 1);
        container.appendChild(cell).className = "grid-item";
        container.appendChild(cell).id = "grid" + (c);
    }
}

function createNewFood() {
    var rnd = Math.floor(Math.random() * 100);
    if (rnd == playerPosition) {
        foodPosition = createNewFood();
        return;
    }
    console.log(rnd);
    var id = ("grid" + rnd);
    var element = document.getElementById(id);
    element.innerText = '0';
    return rnd;
}

function checkIfThereIsFoodAndNotDuplicate() {
    var foodCount = 0;
    for (var i = 0; i < 100; i++) {
        var id = "grid" + i;
        var element = document.getElementById(id);
        if (element.innerText == '0') {
            foodCount++; 
        }
    }
    if (foodCount == 1) return true;
    else {
        console.log("More or less than 1 detected");
        document.getElementById("grid99").innerText = '';
        for (var i = 0; i < 100; i++) {
            var id = "grid" + i;
            var element = document.getElementById(id);
            element.innerText = '';
        }
        //var rnd = Math.floor(Math.random() * 100);
        var id = "grid" + playerPosition;
        var element = document.getElementById(id);
        element.innerText = 'X';
        foodPosition = createNewFood();
        checkIfThereIsFoodAndNotDuplicate();
    }

    return false;
}

function getStartPoint() {
    var rnd = Math.floor(Math.random() * 100);
    var id = ("grid" + rnd);
    var element = document.getElementById(id);
    element.innerText = 'X';
    return rnd;
}

function checkIfFood() {
    if (playerPosition == foodPosition) {
        foodPosition = createNewFood();
        score += 100;
        energy += 3;
        updateEnergy();
        updateScore();
    }
    if (!checkIfThereIsFoodAndNotDuplicate()) {
        checkIfFood();
    }
}

function decrementEnergy() {
    energy--;
    updateEnergy();
    if (energy == 0) {
        alert("Game Over" + " " + "Score: " + score)
        window.location.reload();
    }
}

function updateEnergy() {
    var element = document.getElementById('energy');
    element.innerText = "Energy: " + energy + ";";
}

function updateScore() {
    var element = document.getElementById('score');
    element.innerText = "Score: " + score;
}

function moveUp() {
    var id = ("grid" + playerPosition);
    var element = document.getElementById(id);
    element.innerText = '';
    playerPosition -= 10;
    id = ("grid" + playerPosition);
    element = document.getElementById(id);
    element.innerText = 'X';
}

function moveDown() {
    var id = ("grid" + playerPosition);
    var element = document.getElementById(id);
    element.innerText = '';
    playerPosition += 10;
    id = ("grid" + playerPosition);
    element = document.getElementById(id);
    element.innerText = 'X';
}

function moveLeft() {
    var id = ("grid" + playerPosition);
    var element = document.getElementById(id);
    element.innerText = '';
    playerPosition -= 1;
    id = ("grid" + playerPosition);
    element = document.getElementById(id);
    element.innerText = 'X';
}

function moveRight() {
    var id = ("grid" + playerPosition);
    var element = document.getElementById(id);
    element.innerText = '';
    playerPosition += 1;
    id = ("grid" + playerPosition);
    element = document.getElementById(id);
    element.innerText = 'X';
}

function checkLoop(movement) {
    if (playerPosition.toString().length == 1 && movement == -10) {
        var id = ("grid" + playerPosition);
        var element = document.getElementById(id);
        element.innerText = '';
        playerPosition += 90;
        id = ("grid" + playerPosition);
        element = document.getElementById(id);
        element.innerText = 'X';
        return true;
    } else if (playerPosition % 10 == 0 && movement == - 1) {
        var id = ("grid" + playerPosition);
        var element = document.getElementById(id);
        element.innerText = '';
        playerPosition += 9;
        id = ("grid" + playerPosition);
        element = document.getElementById(id);
        element.innerText = 'X';
        return true;
    } else if ((playerPosition + 10).toString().length == 3 && movement == +10) {
        var id = ("grid" + playerPosition);
        var element = document.getElementById(id);
        element.innerText = '';
        playerPosition -= 90;
        id = ("grid" + playerPosition);
        element = document.getElementById(id);
        element.innerText = 'X';
        return true;
    } else if ((playerPosition + 1) % 10 == 0 && movement == +1) {
        var id = ("grid" + playerPosition);
        var element = document.getElementById(id);
        element.innerText = '';
        playerPosition -= 9;
        id = ("grid" + playerPosition);
        element = document.getElementById(id);
        element.innerText = 'X';
        return true;
    } 
    return false;
}

makeRows(10, 10);
playerPosition = getStartPoint();
foodPosition = createNewFood();

onkeydown = function() {
    if (event.keyCode == 87 || event.keyCode == 38) { //w
        if (!checkLoop(-10)) {
            moveUp();
        }
        checkIfFood();
        decrementEnergy();
    } else if (event.keyCode == 65 || event.keyCode == 37) { //a
        if (!checkLoop(-1)) {
            moveLeft();
        }
        checkIfFood();
        decrementEnergy();
    } else if (event.keyCode == 83 || event.keyCode == 40) { //s
        if (!checkLoop(+10)) {
            moveDown();
        }
        checkIfFood();
        decrementEnergy();
    } else if (event.keyCode == 68 || event.keyCode == 39) { //d
        if (!checkLoop(+1)) {
            moveRight();
        }
        checkIfFood();
        decrementEnergy();
    }
}