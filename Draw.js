const canvas = document.getElementById('canvas');
var bCoords = document.getElementById('bCoords');
var bTitle = document.getElementById('bTitle');
const btnClear = document.getElementById('btnClear');
const btnSave = document.getElementById('btnSave');
var mouseDown = false, drawState = false;
// x /2.66, y /4.69 

// drawing
function getMousePosUpdate(canvas, evt) {   
    var rect = canvas.getBoundingClientRect();
    var x = 0, y = 0;
    x = evt.clientX - rect.left;
    x += 0.5;
    y = evt.clientY - rect.top;
    return "X coord: " + x + ", Y coord: " + y;
}
function getMousePosX(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var x = 0;
    x = evt.clientX - rect.left;
    return x;
}
function getMousePosY(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var y = 0;
    y = evt.clientY - rect.top;
    return y;
}
function drawOnMousePostiton(canvas) {
    var ctx = canvas.getContext("2d");
    //ctx.moveTo(0, 0)
    //ctx.lineTo(getMousePosX(canvas, event) / 2.66, getMousePosY(canvas, event) / 4.69)
    ctx.lineWidth = "0.5";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.rect(getMousePosX(canvas, event) / 2.66, getMousePosY(canvas, event) / 4.69, 1, 0.4);
    ctx.stroke();
}
function eraseOnMousePostiton(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.lineWidth = "5";
    ctx.strokeStyle = "rgb(240, 240, 240)";
    ctx.beginPath();
    ctx.rect(getMousePosX(canvas, event) / 2.66, getMousePosY(canvas, event) / 4.69, 1, 0.4);
    ctx.stroke();
}
function getTitle(bTitle) {
    var TitleArray = ["Cake", "Car", "Tree", "Apple", "Pear", "Plane", "Train", "Bear", "House", "Beach", "Rhino", "Hippo", "Bathroom", "Garden", "Panda", "Ambulance", "Alligator", "Bird", "Bridge", "Bus Stop", "Chair", "Boat", "Cat", "Dog", "Church", "Shop", "Furniture", "School"];
    var i = Math.floor(Math.random() * TitleArray.length);
    bTitle.innerText = "Draw " + TitleArray[i];
}

// saving

// read this from here
function saveCanvas() {
    var img = document.createElement('img');
    img.src = canvas.toDataURL()

    var div = document.createElement('div');
    div.contentEditable = true;
    div.appendChild(img);
    document.body.appendChild(div);

    // do copy
    SelectText(div);
    document.execCommand('Copy');
    document.body.removeChild(div);
}

function SelectText(element) {
    var doc = document;
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
// to here


//var fileSaver = require('file-saver');
//
//function saveCanvas() {
//    canvas.toBlob(function(blob) {
//        fileSaver.saveAs(blob, prompt("Enter File Name"));
//    });
//}

//fetch("Draw.txt").then(response => response.text()).then(text => console.log(text));
//console.log(URL.createObjectURL("text"));

// event handlers
canvas.addEventListener("mousemove", function() {
    bCoords.innerText = getMousePosUpdate(canvas, event);
    if (mouseDown) {
        drawOnMousePostiton(canvas);
    } else if (drawState) {
        eraseOnMousePostiton(canvas);
    }
});
canvas.addEventListener("mousedown" , function() {
    if (event.which == 3) {
        drawState = true;
    } else {
        mouseDown = true;
    }
});
canvas.addEventListener("mouseup", function() {
    mouseDown = false;
    drawState = false;
});
canvas.addEventListener("mouseleave", function() {
    mouseDown = false;
    drawState = false;
});
canvas.addEventListener("click", function() {
    drawOnMousePostiton(canvas);
});
//btn events
btnClear.addEventListener("click", function() {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
btnSave.addEventListener("click", function() {
    saveCanvas();
});
getTitle(bTitle);