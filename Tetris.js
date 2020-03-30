const canvas = document.getElementById('Canvas');
const context = canvas.getContext('2d');
const body = document.getElementById('body');

//Guide:
//30X x x 7.5Y per tile

//blank - 0
//light blue - 1
//blue - 2
//orange - 3
//yellow - 4
//green - 5
//purple - 6
//red - 7

//canvas - 150 y
//canvas - 300 x

// X = 0 - 9, Y = 0 - 19

//board[y][x]

//declare pieces
const lightBlue = {
    //pivot coords
    x: 5,
    y: 1,
    //other pieces
    piece1Y: 0,
    piece1X: -1,
    piece2Y: 0,
    piece2X: -2,
    piece3Y: 0,
    piece3X: 1,
    //other
    colour: "lightblue",
    colourNum: 1
}
const blue = {
    //pivot coords
    x: 5,
    y: 1,
    //other pieces
    piece1Y: 0,
    piece1X: -1,
    piece2Y: -1,
    piece2X: -1,
    piece3Y: 0,
    piece3X: 1,
    //other
    colour: "blue",
    colourNum: 2
}
const orange = {
    //pivot coords
    x: 5,
    y: 1,
    //other pieces
    piece1Y: 0,
    piece1X: -1,
    piece2Y: 0,
    piece2X: 1,
    piece3Y: -1,
    piece3X: 1,
    //other
    colour: "orange",
    colourNum: 3
}
const yellow = {
    //pivot coords
    x: 5,
    y: 1,
    //other pieces
    piece1Y: 0,
    piece1X: 1,
    piece2Y: -1,
    piece2X: 0,
    piece3Y: -1,
    piece3X: 1,
    //other
    colour: "yellow",
    colourNum: 4
}
const green = {
    //pivot coords
    x: 5,
    y: 1,
    //other pieces
    piece1Y: 0,
    piece1X: -1,
    piece2Y: -1,
    piece2X: 0,
    piece3Y: -1,
    piece3X: 1,
    //other
    colour: "green",
    colourNum: 5
}
const purple = {
    //pivot coords
    x: 5,
    y: 1,
    //other pieces
    piece1Y: 0,
    piece1X: -1,
    piece2Y: -1,
    piece2X: 0,
    piece3Y: 0,
    piece3X: 1,
    //other
    colour: "purple",
    colourNum: 6
}
const red = {
    //pivot coords
    x: 5,
    y: 1,
    //other pieces
    piece1Y: -1,
    piece1X: -1,
    piece2Y: -1,
    piece2X: 0,
    piece3Y: 0,
    piece3X: 1,
    //other
    colour: "red",
    colourNum: 7
}

var activePiece;

//create board array
var board = new Array(20);

for (let j = 0; j < 20; j++) {
    board[j] = new Array(10);
}

//initialise array
for (let j = 0; j < 20; j++) {
    for (let i = 0; i < 10; i++) {
        if (j == 19) {
            board[j][i] = 8;
        } else {
            board[j][i] = 0; 
        }
    }
}

//create pieceArray
var pieceArray = Array(3);

for (let j = 0; j < 3; j++) {
    pieceArray[j] = Array(3);
}

//initialise array
for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
        pieceArray[j][i] = 0;
    }
}

//render

function renderBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < 20; j++) {
        for (let i = 0; i < 10; i++) {
            colourTile(i, j);
        }
    }
}

function colourTile(i, j) {
    switch (board[j][i]) {
        case 0:
            //blank space
            context.fillStyle = "black";
            createTile(i, j);
            break;
        case 1:
            //light blue
            context.fillStyle = "lightblue";
            createTile(i, j);
            break;
        case 2:
            //blue
            context.fillStyle = "blue";
            createTile(i, j);
            break;
        case 3:
            //orange
            context.fillStyle = "orange";
            createTile(i, j);
            break;
        case 4:
            //yellow
            context.fillStyle = "yellow";
            createTile(i, j);
            break;
        case 5:
            //green
            context.fillStyle = "green";
            createTile(i, j);
            break;
        case 6:
            //purple
            context.fillStyle = "purple";
            createTile(i, j);
            break;
        case 7:
            //red
            context.fillStyle = "red";
            createTile(i, j);
            break;
        case 8:
            //lightslategrey
            context.fillStyle = "lightslategrey";
            createTile(i, j);
            break;
        case 9:
            //active tile
            context.fillStyle = activePiece.colour;
            createTile(i, j)
            break;
    }
}

function createTile(i, j) {
    context.fillRect(i * 30, j * 7.5, 30, 7.5);
}

//select piece

function newPiece() {
    var rnd = Math.floor(Math.random() * 7);
    switch (rnd) {
        case 0:
            activePiece = lightBlue;
            break;
        case 1:
            activePiece = blue;
            break;
        case 2:
            activePiece = orange;
            break;
        case 3:
            activePiece = yellow;
            break;
        case 4:
            activePiece = green;
            break;
        case 5:
            activePiece = purple;
            break;
        case 6:
            activePiece = red;
            break;
    }
}

//piece rotation

function rotatePiece() {
    clearPieceArray();
    var boardY = 0;
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            if (i == 0) {
                boardY = 2;
            } else if (i == 2) {
                boardY = 0;
            } else {
                boardY = 1;
            }
            //if (rotateOnly9s((activePiece.x - 1) + j, (activePiece.y - 1) + boardY)) {
                pieceArray[j][i] = board[(activePiece.y - 1) + boardY][(activePiece.x - 1) + j];                
            //}

        }
    }

    //pieceArray[0][2] = board[activePiece.y - 1][activePiece.x - 1]; // 0, 0
    //pieceArray[1][2] = board[activePiece.y - 1][activePiece.x]; // 0, 1
    //pieceArray[2][2] = board[activePiece.y - 1][activePiece.x + 1]; // 0, 2
    //pieceArray[0][1] = board[activePiece.y][activePiece.x - 1]; // 1, 0
    //pieceArray[1][1] = board[activePiece.y][activePiece.x]; // 1, 1
    //pieceArray[2][1] = board[activePiece.y][activePiece.x + 1]; // 1, 2
    //pieceArray[0][0] = board[activePiece.y + 1][activePiece.x - 1]; // 2, 0
    //pieceArray[1][0] = board[activePiece.y + 1][activePiece.x]; // 2, 1
    //pieceArray[2][0] = board[activePiece.y + 1][activePiece.x + 1]; // 2, 2
    //output array
    clearTrailingPieces();
    createActivePiece();
}

function rotateOnly9s(i, j) {
    if (board[j][i] == 9) {
        return true;
    } else {
        return false;
    }
}


//create & clear activePiece

function createInitialActivePiece() {
    pieceArray[1][1] = 9;
    pieceArray[1 + activePiece.piece1Y][1 + activePiece.piece1X] = 9;
    pieceArray[1 + activePiece.piece2Y][1 + activePiece.piece2X] = 9;
    pieceArray[1 + activePiece.piece3Y][1 + activePiece.piece3X] = 9;
    createActivePiece();
}

function clearTrailingPieces() {
    for (let j = 0; j < 20; j++) {
        for (let i = 0; i < 10; i++) {
            if (board[j][i] == 9) {
                board[j][i] = 0;
            }
        }
    }
}

function createActivePiece() {
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            if (pieceArray[j][i] == 9) {
                board[(activePiece.y - 1) + j][(activePiece.x - 1) + i] = pieceArray[j][i];
            } else {
                board[(activePiece.y - 1) + j][(activePiece.x - 1) + i] = board[(activePiece.y - 1) + j][(activePiece.x - 1) + i];
            }
        }
    }
}

//clear piece array

function clearPieceArray() {
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            pieceArray[j][i] = 0;
        }
    }
}

//border detection

function detectSideBorders(movement) {
    if ((board[activePiece.y - 1][9] == 9 || board[activePiece.y][9] == 9 || board[activePiece.y + 1][9] == 9) && movement == 1) {
        return false;
    } else if ((board[activePiece.y - 1][0] == 9 || board[activePiece.y][0] == 9 || board[activePiece.y + 1][0] == 9) && movement == -1) {
        return false;
    } else {
        return true;
    }
}

function checkCrossedBorder() {
    if (activePiece.x == 9) {
        if (pieceArray[0][2] == 9 || pieceArray[2][2] == 9) {
            return false;
        }
    } else if (activePiece.x == 0) {
        if (pieceArray[0][0] == 9 || pieceArray[2][0] == 9) {
            return false;
        }
    } else {
        return true;
    }
}

//piece movement collision

//need to make it for each indiviual piece
function blockVerticalMovement(movement) {
    for (let j = 0; j < 3; j++) {
        if (activePiece.x - 2 > 0) {
            if (board[(activePiece.y - 1) + j][activePiece.x - 2] != 0 && movement == -1) {
                return true;
            }
        }
        if (activePiece.x + 2 < 9) {
            if (board[(activePiece.y - 1) + j][activePiece.x + 2] != 0 && movement == 1) {
                return true;
            }            
        }
    }
    return false;
}

//piece and floor collision

function convertActivePieceToNum() {
    for (let j = 0; j < 20; j++) {
        for (let i = 0; i < 10; i++) {
            if (board[j][i] == 9) {
                board[j][i] = activePiece.colourNum;
            }
        }
    }
    return true;
}

//function floorCollision() {
//    for (let i = 0; i < 10; i++) {
//        if (board[18][i] == 9) {
//            return true;
//        }
//    }
//    return false;
//}

function collision() {
    for (let j = 0; j < 19; j++) {
        for (let i = 0; i < 10; i++) {
            if (board[j][i] == 9) {
                if (board[j + 1][i] != 0 && board[j + 1][i] != 9) {
                    return true;
                }                     
            }
        }
    }
    return false;
}

//drop down 1 block

function drop1Block() {
    if (collision()) {
        newBlock();
    } else {
        activePiece.y++;
        clearTrailingPieces();
        createActivePiece();
        renderBoard();  
    }
}

//game running

function newBlock() {
    convertActivePieceToNum();
    clearPieceArray();
    newPiece();
    createInitialActivePiece();
    renderBoard();
}

newBlock();

body.addEventListener('keypress', function (event) {
    switch (event.key) {
        case "w": case "W":
            if (checkCrossedBorder()) {
                rotatePiece();
                createActivePiece();
                renderBoard();
            }
            break;
        case "s": case "S":
            drop1Block();
            break;
        case "a": case "A":
            if (detectSideBorders(-1) && !blockVerticalMovement(-1)) {
                activePiece.x--;
                clearTrailingPieces();
                createActivePiece();
                renderBoard();
            }
            break;
        case "d": case "D":
            if (detectSideBorders(1) && !blockVerticalMovement(1)) {
                activePiece.x++;
                clearTrailingPieces();
                createActivePiece();
                renderBoard();
            }
            break;
    }
});

body.addEventListener('keypress', function(event) {
    if (event.key == "r") {
        var count = 0;
        for (let j = 0; j < 20; j++) {
            for (let i = 0; i < 10; i++) {
                if (board[j][i] == 9) {
                    count++;
                }
            }
        }
        console.log(count);
    }
})