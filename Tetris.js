const canvas = document.getElementById('canvas');
const canvStored = document.getElementById('canvStored');
const context = canvas.getContext('2d');
const contextStored = canvStored.getContext('2d');
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

// declare pieces

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
    ID: 1,
    score: 3
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
    ID: 2,
    score: 4
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
    ID: 3,
    score: 4
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
    ID: 4,
    score: 4
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
    ID: 5,
    score: 4
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
    ID: 6,
    score: 4
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
    ID: 7,
    score: 4
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const PIECE_ARRAY_WH = 3; // piece array width & height

var activePiece;
var storedPiece = null;

var score = 0;
var arrayOfPieces = [];
var arrayOfPiecesPosition = 0;
var paused = false;

// Create & Initialise Arrays

var board = new Array(BOARD_HEIGHT);
var pieceArray = Array(PIECE_ARRAY_WH);

for (let j = 0; j < BOARD_HEIGHT; j++) {
    board[j] = new Array(BOARD_WIDTH);
}

for (let j = 0; j < BOARD_HEIGHT; j++) {
    for (let i = 0; i < BOARD_WIDTH; i++) {
        if (j == BOARD_HEIGHT - 1) {
            board[j][i] = 8;
        } else {
            board[j][i] = 0; 
        }
    }
}

for (let j = 0; j < PIECE_ARRAY_WH; j++) {
    pieceArray[j] = Array(PIECE_ARRAY_WH);
}

for (let j = 0; j < PIECE_ARRAY_WH; j++) {
    for (let i = 0; i < PIECE_ARRAY_WH; i++) {
        pieceArray[j][i] = 0;
    }
}

// remove canvas blur

var scale = window.devicePixelRatio;
canvas.width = Math.floor(150 * scale);
canvas.height = Math.floor(300 * scale);
context.scale(scale, scale);

// Render Board

function renderBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < BOARD_HEIGHT; j++) {
        for (let i = 0; i < BOARD_WIDTH; i++) {
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
            context.fillStyle = "#222629";
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
    context.fillRect(i * canvas.width / BOARD_WIDTH, j * canvas.height / BOARD_HEIGHT, canvas.width / BOARD_WIDTH, canvas.height / BOARD_HEIGHT);
}

// Render & Update Stored Canvas

function updateStoredPieceCanvas() {
    contextStored.clearRect(0, 0, canvStored.width, canvStored.height);
    contextStored.fillStyle = storedPiece.colour;
    createStoredTile(1, 1);
    createStoredTile(1 + storedPiece.piece1X, 1 + storedPiece.piece1Y);
    createStoredTile(1 + storedPiece.piece2X, 1 + storedPiece.piece2Y);
    createStoredTile(1 + storedPiece.piece3X, 1 + storedPiece.piece3Y);
}

function createStoredTile(i, j) {
    contextStored.fillRect(i * canvStored.width / PIECE_ARRAY_WH, j * canvStored.height / PIECE_ARRAY_WH, canvStored.width / PIECE_ARRAY_WH, canvStored.height / PIECE_ARRAY_WH);
}

// Select & Rotate Pieces

function newPiece() {
    if (arrayOfPiecesPosition >= 7) {
        createArrayOfPieces();
    }
    
    switch (arrayOfPieces[arrayOfPiecesPosition]) {
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
    activePiece.y = 1; 
    activePiece.x = 5;
    arrayOfPiecesPosition++;
}

function createArrayOfPieces() {
    arrayOfPieces = [0, 1, 2, 3, 4, 5, 6];
    arrayOfPiecesPosition = 0;
    arrayOfPieces.sort(() => Math.random() - 0.5);
}

function rotatePiece() {
    clearPieceArray();
    let boardY = 0;
    for (let j = 0; j < PIECE_ARRAY_WH; j++) {
        for (let i = 0; i < PIECE_ARRAY_WH; i++) {
            if (i == 0) {
                boardY = 2;
            } else if (i == 2) {
                boardY = 0;
            } else {
                boardY = 1;
            }
            if (isNine(((activePiece.x - 1) + j), ((activePiece.y - 1) + boardY))) {
                pieceArray[j][i] = board[(activePiece.y - 1) + boardY][(activePiece.x - 1) + j];                
            }
        }
    }
    remove9s();
}

function isNine(i, j) {
    return board[j][i] == 9;
}

// Switch Out Pieces

function switchOutPieces() {
    if (storedPiece != null) {
        if (!checkStoredPieceCrossBorder() && !checkStoredPieceCrossBlock()) {   
            let tempPiece = activePiece;
            activePiece = storedPiece;
            storedPiece = tempPiece;
            activePiece.y = storedPiece.y;
            activePiece.x = storedPiece.x;
            remove9s();
            clearPieceArray();
            updatePieceArray();
        }
    } else {
        storedPiece = activePiece;
        remove9s();
        newBlock();
    }
    updateStoredPieceCanvas();

}

// Create & Clear ActivePiece

function updatePieceArray() {
    pieceArray[1][1] = 9;
    pieceArray[1 + activePiece.piece1Y][1 + activePiece.piece1X] = 9;
    pieceArray[1 + activePiece.piece2Y][1 + activePiece.piece2X] = 9;
    pieceArray[1 + activePiece.piece3Y][1 + activePiece.piece3X] = 9;
    createActivePiece();
}

function remove9s() {
    for (let j = 0; j < BOARD_HEIGHT; j++) {
        for (let i = 0; i < BOARD_WIDTH; i++) {
            if (board[j][i] == 9) {
                board[j][i] = 0;
            }
        }
    }
}

function createActivePiece() {
    for (let j = 0; j < PIECE_ARRAY_WH; j++) {
        for (let i = 0; i < PIECE_ARRAY_WH; i++) {
            if (pieceArray[j][i] == 9) {
                board[(activePiece.y - 1) + j][(activePiece.x - 1) + i] = pieceArray[j][i];
            }
        }
    }
}

function clearPieceArray() {
    for (let j = 0; j < PIECE_ARRAY_WH; j++) {
        for (let i = 0; i < PIECE_ARRAY_WH; i++) {
            pieceArray[j][i] = 0;
        }
    }
}

// Collision detection

function detectSideBorders(movement) {
    if ((board[activePiece.y - 1][9] == 9 || board[activePiece.y][9] == 9 || board[activePiece.y + 1][9] == 9) && movement == 1) {
        return false;
    } else if ((board[activePiece.y - 1][0] == 9 || board[activePiece.y][0] == 9 || board[activePiece.y + 1][0] == 9) && movement == -1) {
        return false;
    }
    return true;
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
    }
    return true;        
}

function checkCrossedOtherBlock() {
    let temp = Array(PIECE_ARRAY_WH);

    for (let i = 0; i < PIECE_ARRAY_WH; i++) {
        temp[i] = Array(PIECE_ARRAY_WH);
    }

    for (let j = 0; j < PIECE_ARRAY_WH; j++) {
        for (let i = 0; i < PIECE_ARRAY_WH; i++) {
            temp[j][i] = 0;
        }
    }

    // fill temp with rotated

    let boardY = 0;
    for (let j = 0; j < PIECE_ARRAY_WH; j++) {
        for (let i = 0; i < PIECE_ARRAY_WH; i++) {
            if (i == 0) {
                boardY = 2;
            } else if (i == 2) {
                boardY = 0;
            } else {
                boardY = 1;
            }
            if (isNine(((activePiece.x - 1) + j), ((activePiece.y - 1) + boardY))) {
                temp[j][i] = board[(activePiece.y - 1) + boardY][(activePiece.x - 1) + j];
            }
        }
    }

    for (let j = 0; j < PIECE_ARRAY_WH; j++) {
        for (let i = 0; i < PIECE_ARRAY_WH; i++) {
            if (temp[j][i] == 9 && (board[(activePiece.y - 1) + j][(activePiece.x - 1) + i] != 0 && board[(activePiece.y - 1) + j][(activePiece.x - 1) + i] != 9)) {
                return false;
            }
        }
    }
    return true;
}

function blockHorizontalMovement(movement) {
    for (let j = 0; j < PIECE_ARRAY_WH; j++) {
        for (let i = 0; i < PIECE_ARRAY_WH; i++) {
            if (activePiece.x != 0 && movement == -1) {
                if (board[(activePiece.y - 1) + j][(activePiece.x - 1) + i] == 9) {
                    if (board[(activePiece.y - 1) + j][(activePiece.x - 1 - 1) + i] != 0 && board[(activePiece.y - 1) + j][(activePiece.x - 1 - 1) + i] != 9) {
                        return true;
                    }
                }
            }
            if (activePiece.x != 9 && movement == 1) {
                if (board[(activePiece.y - 1) + j][(activePiece.x - 1) + i] == 9) {
                    if (board[(activePiece.y - 1) + j][(activePiece.x) + i] != 0 && board[(activePiece.y - 1) + j][(activePiece.x) + i] != 9) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function checkStoredPieceCrossBlock() {
    if (board[activePiece.y + storedPiece.piece1Y][activePiece.x + storedPiece.piece1X] == 0 || board[activePiece.y + storedPiece.piece1Y][activePiece.x + storedPiece.piece1X] == 9) {
        if (board[activePiece.y + storedPiece.piece2Y][activePiece.x + storedPiece.piece2X] == 0 || board[activePiece.y + storedPiece.piece2Y][activePiece.x + storedPiece.piece2X] == 9) {
            if (board[activePiece.y + storedPiece.piece3Y][activePiece.x + storedPiece.piece3X] == 0 || board[activePiece.y + storedPiece.piece3Y][activePiece.x + storedPiece.piece3X] == 9) {
                return false;
            }
        }
    }
    return true;
}

function checkStoredPieceCrossBorder() {
    if (activePiece.x == 9) {
        if (storedPiece.piece1X == 1 || storedPiece.piece2X == 1 || storedPiece.piece3X == 1) {
            return true;
        }
    }
    if (activePiece.x == 0) {
        if (storedPiece.piece1X == -1 || storedPiece.piece2X == -1 || storedPiece.piece3X == -1) {
            return true;
        }
    }
    return false;
}

function collision() {
    for (let j = 0; j < BOARD_HEIGHT - 1; j++) {
        for (let i = 0; i < BOARD_WIDTH; i++) {
            if (board[j][i] == 9) {
                if (board[j + 1][i] != 0 && board[j + 1][i] != 9) {
                    return true;
                }                     
            }
        }
    }
    return false;
}

// Game Logic & Other Methods

function drop1Block() {
    if (collision()) {
        checkForFullRow();
        updateScore(activePiece.score);
        newBlock();
    } else {
        activePiece.y++;
        remove9s();
        createActivePiece();
        renderBoard();        
    }
}

function convertActivePieceToNum() {
    for (let j = 0; j < BOARD_HEIGHT; j++) {
        for (let i = 0; i < BOARD_WIDTH; i++) {
            if (board[j][i] == 9) {
                board[j][i] = activePiece.ID;
            }
        }
    }
}

function checkGameEnding() {
    for (let i = 0; i < BOARD_WIDTH; i++) {
        if (board[2][i] != 0 && board[2][i] != 9) {
            clearInterval(gameInterval);
            alert('Game Over');
            window.location.reload();
            break;
        }
    }
}

function checkForFullRow() {
    let count = 0;
    for (let j = 0; j < BOARD_HEIGHT - 1; j++) {
        for (let i = 0; i < BOARD_WIDTH; i++) {
            if (board[j][i] != 0) {
                count++;
            }
        }
        if (count == 10) {
            for (let z = j - 1; z > 0; z--) {
                for (let i = 0; i < BOARD_WIDTH; i++) {
                    board[z + 1][i] = board[z][i];
                }
            }
            score += 10;
            checkForFullRow();                      
            break;
        }          
        count = 0;
    }
}

function updateScore(increment) {
    let bScore = document.getElementById("bScore");
    score += increment;
    bScore.innerText = score;
}

function newBlock() {
    convertActivePieceToNum();
    clearPieceArray(); 
    newPiece();
    updatePieceArray();
    renderBoard();
}

function game() {
    drop1Block();
    checkGameEnding();
}

// Run Game

createArrayOfPieces();
newBlock();
var gameInterval = setInterval(game, 1000 / 3);

body.addEventListener('keydown', function (event) {
    checkGameEnding();
    switch (event.key) {
        case "w": case "W": case "ArrowUp":
            if (checkCrossedBorder() && checkCrossedOtherBlock()) {
                if (activePiece.y < 18) {
                    rotatePiece();
                    createActivePiece();
                    renderBoard();                    
                }
            }
            break;
        case "s": case "S": case "ArrowDown":
            drop1Block();
            break;
        case "a": case "A": case "ArrowLeft":
            if (detectSideBorders(-1) && !blockHorizontalMovement(-1)) {
                activePiece.x--;
                remove9s();
                createActivePiece();
                renderBoard();
            }
            break;
        case "d": case "D": case "ArrowRight":
            if (detectSideBorders(1) && !blockHorizontalMovement(1)) {
                activePiece.x++;
                remove9s();
                createActivePiece();
                renderBoard();
            }
            break;
        case "Shift": case "Control":
            switchOutPieces();
            createActivePiece();
            renderBoard();
            break;
        case " ": case "Insert":
            while (!collision()) {
                drop1Block();
            }
            break;
    }
});
