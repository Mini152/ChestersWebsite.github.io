const container = document.getElementById("container");
var position, Energy = 100;

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

function getStartPoint() {
    var rnd = Math.floor(Math.random() * 100) + 1;
    var id = ("grid" + rnd);
    var element = document.getElementById(id);
    element.innerText = 'X';
    return rnd;
}

function moveUp() {
    var id = ("grid" + position);
    var element = document.getElementById(id);
    element.innerText = '';
    position -= 10;
    id = ("grid" + position);
    element = document.getElementById(id);
    element.innerText = 'X';
}

function moveDown() {
    var id = ("grid" + position);
    var element = document.getElementById(id);
    element.innerText = '';
    position += 10;
    id = ("grid" + position);
    element = document.getElementById(id);
    element.innerText = 'X';
}

function moveLeft() {
    var id = ("grid" + position);
    var element = document.getElementById(id);
    element.innerText = '';
    position -= 1;
    id = ("grid" + position);
    element = document.getElementById(id);
    element.innerText = 'X';
}

function moveRight() {
    var id = ("grid" + position);
    var element = document.getElementById(id);
    element.innerText = '';
    position += 1;
    id = ("grid" + position);
    element = document.getElementById(id);
    element.innerText = 'X';
}

function checkLoop(Movement) {
    if (position.toString().length == 1 && Movement == -10) {
        var id = ("grid" + position);
        var element = document.getElementById(id);
        element.innerText = '';
        position += 90;
        id = ("grid" + position);
        element = document.getElementById(id);
        element.innerText = 'X';
        return true;
    } else if (position % 10 == 0 && Movement == - 1) {
        var id = ("grid" + position);
        var element = document.getElementById(id);
        element.innerText = '';
        position += 9;
        id = ("grid" + position);
        element = document.getElementById(id);
        element.innerText = 'X';
        return true;
    } else if ((position + 9).toString().length == 3 && Movement == +10) {
        var id = ("grid" + position);
        var element = document.getElementById(id);
        element.innerText = '';
        position -= 90;
        id = ("grid" + position);
        element = document.getElementById(id);
        element.innerText = 'X';
        return true;
    } else if ((position % 10) + 1 == 0 && Movement == +1) {
        var id = ("grid" + position);
        var element = document.getElementById(id);
        element.innerText = '';
        position -= 9;
        id = ("grid" + position);
        element = document.getElementById(id);
        element.innerText = 'X';
        return true;
    } 
    return false;
}

makeRows(10, 10);
position = getStartPoint();

onkeydown = function() {
    if (event.keyCode == 87 || event.keyCode == 38) { //w
        if (checkLoop(-10))
            return;
        else
            moveUp();
        Energy--;
    } else if (event.keyCode == 65 || event.keyCode == 37) { //a
        if (checkLoop(-1))
            return;
        else
            moveLeft();
        Energy--;
    } else if (event.keyCode == 83 || event.keyCode == 40) { //s
        if (checkLoop(+10))
            return;
        else
            moveDown();
        Energy--;
    } else if (event.keyCode == 68 || event.keyCode == 39) { //d
        if (checkLoop(+1))
            return;
        else
            moveRight();
        Energy--;
    }
}