const body = document.getElementById("body");

// scaling
// -----------------------------------------

function resizeWindow() {
    let gamesOffset = "";
    let utilityOffset = "";
    let codeOffset = "";
    let aboutOffset = "";
    let divGamesDropdown = document.getElementById("divGamesDropdown");
    let divUtilityDropdown = document.getElementById("divUtilityDropdown");
    let btnCode = document.getElementById("btnCode");
    let btnAbout = document.getElementById("btnAbout");
    if (window.outerWidth > 1500) { // if window width is greater than 1500px
        gamesOffset = "16%"; utilityOffset = "8%"; codeOffset = "8%"; aboutOffset = "16%"; // set the postions of the buttons and dropdowns to their widest values
    } else if (window.outerWidth > 1300) { // else if window width is greater than 1500px 
        gamesOffset = "10%"; utilityOffset = "5%"; codeOffset = "5%"; aboutOffset = "10%"; // scale buttons and dropdowns accordingly
    } else if (window.outerWidth > 1100) {
        gamesOffset = "6%"; utilityOffset = "3%"; codeOffset = "3%"; aboutOffset = "6%";
    } else if (window.outerWidth > 1000) {
        gamesOffset = "1%"; utilityOffset = "0%"; codeOffset = "0%"; aboutOffset = "1%";       
    }
    //else { // if window width is less than 1000px the minimum window width will take place
    //    
    //    gamesOffset = "0%"; utilityOffset = "0%"; codeOffset = "0%"; aboutOffset = "0%"; // this will remove all postioning values and the buttons and dropdowns will be at their minimum
    //}
    if (window.outerWidth <= 1000) {
        divGamesDropdown.style.display = "none";
        divUtilityDropdown.style.display = "none";
        btnCode.style.display = "none";
        btnAbout.style.display = "none";
    } else {
        divGamesDropdown.style.display = "inline-block";
        divUtilityDropdown.style.display = "inline-block";
        btnCode.style.display = "inline-block";
        btnAbout.style.display = "inline-block";
    }
    // setting postitons of the top buttons and dropdowns
    document.getElementById("divGamesDropdown").style.right = gamesOffset;
    document.getElementById("divUtilityDropdown").style.right = utilityOffset;
    document.getElementById("btnCode").style.left = codeOffset;
    document.getElementById("btnAbout").style.left = aboutOffset;    
}

// event listeners for when window resize is needed
window.addEventListener("resize", resizeWindow);
window.addEventListener("load", resizeWindow);
document.addEventListener("fullscreenchange", resizeWindow);
window.addEventListener("focus",  resizeWindow);

// menu
// -----------------------------------------

// declaring menu canvs
const divMenu = document.getElementById("divMenu");
const canvMenu = document.getElementById("canvMenu");
const canvInMenu = document.getElementById("canvInMenu");

// declaring menu divs and btns
const btnMenuGames = document.getElementById("btnMenuGames");
const btnMenuUtility = document.getElementById("btnMenuUtility");
const divMenuGamesContent = document.getElementById("divMenuGames-content");
const divMenuUtilityContent = document.getElementById("divMenuUtility-content");

// bools for hidden menu info
var gamesHidden = false;
var utilityHidden = false;

// toggles menu window
canvMenu.addEventListener("click", () => {
    divMenu.style.visibility = "visible"; // show menu
});

canvInMenu.addEventListener("click", () => {
    divMenu.style.visibility = "hidden"; // hide menu
});

// make menu icons (the three lines)
function makeIcons(canv) {
    let canvas = document.getElementById(canv) // canvas element
    let context  = canvas.getContext("2d"); // context of canvas
    context.fillStyle = "#86C232"; // fill colour green
    // w - 290, h - 130
    context.fillRect(10, 10, 280, 30); // creates the three lines for menu icon
    context.fillRect(10, 60, 280, 30);
    context.fillRect(10, 110, 280, 30);
}

// collapses the games displayed in the menu
function toggleMenuGames() {
    if (gamesHidden) { 
        btnMenuGames.innerText = "-"; 
        divMenuGamesContent.style.display = "block"; 
        gamesHidden = false; 
    } else {
        btnMenuGames.innerText = "+"; 
        divMenuGamesContent.style.display = "none"; 
        gamesHidden = true; 
    }
}

// collapses the utilities displayed in the menu
function toggleMenuUtility() {
    if (utilityHidden) { 
        btnMenuUtility.innerText = "-";
        divMenuUtilityContent.style.display = "block";
        utilityHidden = false; 
    } else {
        btnMenuUtility.innerText = "+"; 
        divMenuUtilityContent.style.display = "none";
        utilityHidden = true;
    }
}

// toggles menu games and utility
btnMenuGames.addEventListener("click", toggleMenuGames);
btnMenuUtility.addEventListener("click", toggleMenuUtility);

// draws the menu icon onto the canvas'
makeIcons("canvMenu");
makeIcons("canvInMenu");

// settings
// -----------------------------------------

const divSettings = document.getElementById("divSettings")
const imgSettings = document.getElementById("imgSettings");
const imgInSettings = document.getElementById("imgInSettings");
const btnReloadBackground = document.getElementById("btnReloadBackground");
const btnResetBackground = document.getElementById("btnResetBackground");

// toggle settings div
imgSettings.addEventListener("click", () => {
    divSettings.style.visibility = "visible";
});

imgInSettings.addEventListener("click", () => {
    divSettings.style.visibility = "hidden";
});

// reload & reset btns

btnReloadBackground.addEventListener("click", () => {
    // validating inputs
    // noOfPoints
    let regex = new RegExp('^[0-9][0-9]?[0-9]?$|^1000$'); // regex to limit number of points to between 0 and 1000
    if (!regex.test(document.getElementById("txtNoOfPoints").value)) {
        alert("Number of points must a number between 0 and 1000");
        return;
    }

    // links
    regex = new RegExp('^[0-9]+$'); // regex to only allow numbers
    if (!regex.test(document.getElementById("txtLinks").value)) { // links must be a positive number
        alert("Links must be a number between 0 and " + Math.floor(document.getElementById("txtNoOfPoints").value / 20));
        return;
    }
    if (document.getElementById("txtLinks").value > Math.floor(document.getElementById("txtNoOfPoints").value / 20)) { // links must be less than 5% of the number of points
        alert("Links must be a number between 0 and " + Math.floor(document.getElementById("txtNoOfPoints").value / 20));
        return;
    }

    // anchors
    if (!regex.test(document.getElementById("txtAnchors").value)) { // anchor must be a positive number
        alert("Anchors must be a number between 0 and " + Math.floor(document.getElementById("txtNoOfPoints").value));
        return;
    }
    if (document.getElementById("txtAnchors").value > Math.floor(document.getElementById("txtNoOfPoints").value)) { // anchor must be less than or equal to the number of points
        alert("Anchors must be a number between 0 and " + Math.floor(document.getElementById("txtNoOfPoints").value));
        return;
    }

    // distance
    if (!regex.test(document.getElementById("txtDistance").value)) { // distance must be a positive number
        alert("Distance must be a number greater than or equal to 0");
        return;
    }

    // timeToChange
    if (!regex.test(document.getElementById("txtTimeToChange").value)) { // time to change must be a positive number
        alert("Time to change must be a number greater than or equal to 0");
        return;
    }

    // fill new values
    noOfPoints = document.getElementById("txtNoOfPoints").value;
    links = document.getElementById("txtLinks").value;
    anchors = document.getElementById("txtAnchors").value;
    distance = document.getElementById("txtDistance").value;
    timeToChange = document.getElementById("txtTimeToChange").value;
    
    // reload background
    arrPoints = [];
    orderOfClosest = [];
    movementX = [];
    movementY = [];
    moves = 0;
    clearInterval(interval);    
    createBackground();
    interval = setInterval(changePointsLocation, (timeToChange / distance)); // every timeToChange / distance miliseconds run changePointsLocations
});

btnResetBackground.addEventListener("click", () => {
    // fill inputs with default values
    document.getElementById("txtNoOfPoints").value = 100;
    document.getElementById("txtLinks").value = 5;
    document.getElementById("txtAnchors").value = 20;
    document.getElementById("txtDistance").value = 100;
    document.getElementById("txtTimeToChange").value = 5000;

    // fill variables with default values
    noOfPoints = document.getElementById("txtNoOfPoints").value;
    links = document.getElementById("txtLinks").value;
    anchors = document.getElementById("txtAnchors").value;
    distance = document.getElementById("txtDistance").value;
    timeToChange = document.getElementById("txtTimeToChange").value;

    // reload background
    arrPoints = [];
    orderOfClosest = [];
    movementX = [];
    movementY = [];
    moves = 0;
    clearInterval(interval);
    createBackground();
    interval = setInterval(changePointsLocation, (timeToChange / distance)); // every timeToChange / distance miliseconds run changePointsLocations
});

// title
// -----------------------------------------

function makeTitle() {
    let canvTitle = document.getElementById("canvTitle");
    let context = canvTitle.getContext("2d");

    context.font = "55px Times New Roman";
    context.strokeStyle = "#86C232";
    context.textAlign = "center";
    context.strokeText("Mini152", canvTitle.width / 2, canvTitle.height / 2);
}

makeTitle();

// other button links
// -----------------------------------------

const btnCode = document.getElementById("btnCode");
const btnAbout = document.getElementById("btnAbout");

btnCode.addEventListener("click", () => {
    window.location.href = "Code.html";
});

btnAbout.addEventListener("click", () => {

});

// background animaion
// -----------------------------------------

const canvas = document.getElementById("canvas"); // canvas element
const context = canvas.getContext("2d"); // context of canvas

const MOUSE_DISTANCE = 200;

var arrPoints = [];
var orderOfClosest = [];
var movementX = [];
var movementY = [];
var noOfPoints = 100;
var links = 5; // number of links between nearest points
var anchors = 20; // number of points that are on the border
var distance = 100; // distance between direction changes (in pixels)
var timeToChange = 5000; // miliseconds

var moves = 0;

class point2D { // constructor class for point2D
    constructor(x, y, anchor) { this.x = x; this.y = y; this.anchor = anchor; } // each point2D class has 3 variables attached: x, y, anchor
}

function createBackground() { 
    // removes canvas blur
    canvas.style.width = 100 + "%";
    canvas.style.height = 100 + "%";
    var scale = window.devicePixelRatio;
    canvas.width = Math.floor(window.innerWidth * scale);
    canvas.height = Math.floor(window.innerHeight * scale); 
    context.scale(scale, scale);

    for (let i = 0; i < noOfPoints; i++) {
        if (i < anchors) {
            switch (i % 4) {
                case 0:
                    arrPoints.push(new point2D(Math.floor(Math.random() * canvas.width), 0, true)); // make point on top border
                    break;
                case 1:
                    arrPoints.push(new point2D(canvas.width, Math.floor(Math.random() * canvas.height), true)); // make point on right border
                    break;
                case 2:
                    arrPoints.push(new point2D(Math.floor(Math.random() * canvas.width), canvas.height, true)); // make point on bottom border
                    break;
                case 3:
                    arrPoints.push(new point2D(0, Math.floor(Math.random() * canvas.height), true)); // make point on left border
            }
        } else { // if not an anchor point
            arrPoints.push(new point2D(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), false)); // make regular point on the screen
        }
    }
}

function getClosestPoints(anchorPointIndex) {
    let temp = []; 

    for (let i = 0; i < noOfPoints; i++) { 
        if (i != anchorPointIndex) { 
            let x = arrPoints[anchorPointIndex].x - arrPoints[i].x; 
            let y = arrPoints[anchorPointIndex].y - arrPoints[i].y; 
            if (Math.sign(x) == -1) x = Math.abs(x); 
            if (Math.sign(y) == -1) y = Math.abs(y); 
            let value = x + y; 
            for (let j = 0; j < links; j++) { 
                if (value < temp[j] || temp[j] == null) { 
                    for (let z = j; z < links; z++) { 
                        temp[j + 1] = temp[j]; 
                        orderOfClosest[j + 1] = orderOfClosest[j]; 
                    }
                    temp[j] = value;
                    orderOfClosest[j] = i;      
                    break;
                }
            }
        }
    }
    if (orderOfClosest.length > links) orderOfClosest.pop(); 
    if (temp.length > links) temp.pop(); 
}



function changePointsLocation() {
    if (moves <= 0) { 
        for (let i = 0; i < noOfPoints; i++) { 
            let x = Math.floor(-1 + Math.random() * (1 + 1 - -1)); 
            let y = Math.floor(-1 + Math.random() * (1 + 1 - -1)); 
            movementX[i] = x; 
            movementY[i] = y; 
        }
        moves = distance;
    }
    moves--;
    for (let i = 0; i < noOfPoints; i++) {
        // bounds detection
        if (arrPoints[i].x <= 0) movementX[i] = 1;
        else if (arrPoints[i].x >= canvas.width) movementX[i] = -1;
        else if (arrPoints[i].y <= 0) movementY[i] = 1;
        else if (arrPoints[i].y >= canvas.height) movementY[i] = -1;
    }
    for (let i = 0; i < noOfPoints; i++) { 
        if (arrPoints[i].anchor == false) { 
            arrPoints[i] = new point2D(arrPoints[i].x + movementX[i], arrPoints[i].y + movementY[i], false); 
        }
    }
    renderBackground(); 
}

function renderBackground() {
    context.fillStyle = "#222629"; 
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#86C232"; 
    context.beginPath(); 
    for (let i = 0; i < noOfPoints; i++) {
        getClosestPoints(i); 
        for (let j = 0; j < links; j++) { 
            context.moveTo(arrPoints[i].x, arrPoints[i].y); 
            context.lineTo(arrPoints[orderOfClosest[j]].x, arrPoints[orderOfClosest[j]].y);
        }
    }
    context.stroke(); 
}

// cursor move

function moveFromCursor() {
    let mouseX = getMousePosX();
    let mouseY = getMousePosY();

    for (let i = 0; i < noOfPoints; i++) {
        let pointX = arrPoints[i].x;
        let pointY = arrPoints[i].y;
        let XDiff = pointX - mouseX;
        let YDiff = pointY - mouseY;
        
        if (Math.sign(XDiff) == -1) x = Math.abs(XDiff);
        if (Math.sign(YDiff) == -1) y = Math.abs(YDiff);
        
        let diff = Math.pow(XDiff, 2) + Math.pow(YDiff, 2);
        diff = Math.sqrt(diff);
        
        if (arrPoints[i].anchor) continue;
        
        if (diff <= MOUSE_DISTANCE) {
            let range = (MOUSE_DISTANCE / 3) / 2;
            if (mouseX > pointX - range && mouseX < pointX + range && mouseY > pointY) {
                if (arrPoints[i].y > 0) arrPoints[i].y -= 1;
            } else if (mouseX > pointX - range && mouseX < pointX + range && mouseY < pointY) {
                if (arrPoints[i].y < canvas.height) arrPoints[i].y += 1;
            } else if (mouseY > pointY - range && mouseY < pointY + range && mouseX < pointX) {
                if (arrPoints[i].x < canvas.width) arrPoints[i].x += 1;
            } else if (mouseY > pointY - range && mouseY < pointY + range && mouseX > pointX) {
                if (arrPoints[i].x > 0) arrPoints[i].x -= 1;
            } else if (mouseX < pointX && mouseY < pointY) {
                if (arrPoints[i].x < canvas.width) arrPoints[i].x += 1;
                if (arrPoints[i].y < canvas.height) arrPoints[i].y += 1;
            } else if (mouseX < pointX && mouseY > pointY) {
                if (arrPoints[i].x < canvas.width) arrPoints[i].x += 1;
                if (arrPoints[i].y > 0) arrPoints[i].y -= 1;
            } else if (mouseX > pointX && mouseY < pointY) {
                if (arrPoints[i].x > 0) arrPoints[i].x -= 1;
                if (arrPoints[i].y < canvas.height) arrPoints[i].y += 1;
            } else if (mouseX > pointX && mouseY > pointY) {
                if (arrPoints[i].x > 0) arrPoints[i].x -= 1;
                if (arrPoints[i].y > 0) arrPoints[i].y -= 1;
            }
        }
    }
}

function getMousePosX() {
    var rect = canvas.getBoundingClientRect();
    var x = 0;
    x = event.clientX - rect.left;
    return x;
}
function getMousePosY() {
    var rect = canvas.getBoundingClientRect();
    var y = 0;
    y = event.clientY - rect.top;
    return y;
}

window.addEventListener("resize", () => {
    arrPoints = [];
    createBackground();
    renderBackground();
});

window.addEventListener("mousemove", () =>  {
    moveFromCursor();
});

createBackground(); 
var interval = setInterval(changePointsLocation, (timeToChange / distance)); 
renderBackground();