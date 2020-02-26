const Canvas = document.getElementById('Canvas');
const BtnNext = document.getElementById('BtnNext');
const BtnPrev = document.getElementById('BtnPrev');
const BtnRandom = document.getElementById('BtnRandom');
var i = 0;
const ColourArray = ["blue", "red", "brown", "yellow", "orange", "green", "pink", "white", "grey"];

function NextColour() {
    if (i < ColourArray.length - 1) {
        i++;
    } else {
        i = 0;
    }
    Canvas.style.backgroundColor = ColourArray[i];
}
function PrevColour() {
    if (i > 0) {
        i--;
    } else {
        i = ColourArray.length - 1;
    }
    Canvas.style.backgroundColor = ColourArray[i];   
}
function RandomColour() {
    i = Math.floor(Math.random() * ((ColourArray.length - 1) - 0 + 1)) + 0; //Math.floor(Math.random() * (max - min + 1)) + min
    Canvas.style.backgroundColor = ColourArray[i];
}

BtnNext.addEventListener('click', function() {
    NextColour();
})
BtnPrev.addEventListener('click', function() {
    PrevColour();
})
BtnRandom.addEventListener('click', function() {
    RandomColour();
})
