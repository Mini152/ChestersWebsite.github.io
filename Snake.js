const container = document.getElementById("container");
var position = 0;

function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        //cell.innerText = (c + 1);
        container.appendChild(cell).className = "grid-item";
        container.appendChild(cell).id = "grid" + (c + 1);
    }
}

function getStartPoint() {
    var rnd = Math.floor(Math.random() * 225) + 1;
    var id = ("grid" + rnd);
    var element = document.getElementById(id);
    element.style.backgroundColor = "black";
    return rnd;
}

function moveUp() {
    var id = "btn" + position;
    document.getElementById(id).style.backgroundColor = "lightslategrey";
    position -= 10;
    id = "btn" + position;
    document.getElementById(id).style.backgroundColor = "black";
}
function moveDown() {
    
}
function moveLeft() {
    
}
function moveRight() {
    
}


onkeydown = function() {
    if (event.keyCode == 87) { //w
        moveUp();
    } else if (event.keyCode == 65) { //a
        moveLeft();
    } else if (event.keyCode == 83) { //s
        moveDown();
    } else if (event.keyCode == 68) { //d
        moveRight();
    }
}

makeRows(15, 15);
position = getStartPoint();