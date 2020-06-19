const divMenu = document.getElementById("divMenu");
const divCanvas = document.getElementById("divCanvas");
const divResult = document.getElementById("divResult");
const btnStart = document.getElementById("btnStart");
const btnAgain = document.getElementById("btnAgain");

const canvas = document.getElementById("canvas");
const lblResultDesc = document.getElementById("lblResultDesc");

var timeTaken = 0;
var startTime = null;
function start() {
    divMenu.style.visibility = "hidden";
    divCanvas.style.visibility = "visible";

    setTimeout( () => {
        canvas.style.backgroundColor = "green";
        startTime = Date.now();
    }, Math.random() * 5000);
}

function clicked() {
    timeTaken = Date.now() - startTime;
    divCanvas.style.visibility = "hidden";
    divResult.style.visibility = "visible";
    if (canvas.style.backgroundColor == "green") {
        lblResultDesc.innerText = "Your reaction time was "+ timeTaken +"ms";        
    } else {
        lblResultDesc.innerText = "Your reaction time was too early";        
    }
}

function again() {
    window.location.reload();
}

canvas.addEventListener("click", clicked);
btnStart.addEventListener("click", start);
btnAgain.addEventListener("click", again);