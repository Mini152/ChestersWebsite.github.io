//Buttons
var BtnLink1 = document.getElementById('btnLink1');
var BtnLink2 = document.getElementById('btnLink2');
var BtnLink3 = document.getElementById('btnLink3');
var BtnLink4 = document.getElementById('btnLink4');
var BtnLink5 = document.getElementById('btnLink5');
var BtnLink6 = document.getElementById('btnLink6');
var BtnLink7 = document.getElementById('btnLink7');
var BtnLink8 = document.getElementById('btnLink8');

//Buttons
//BtnLink1
BtnLink1.addEventListener('click', function () {
    window.location.href = 'Draw.html';
});
BtnLink1.addEventListener('auxclick', function () {
    if (event.which == 2) {
        window.open('Draw.html');
    }
});
//BtnLink2
BtnLink2.addEventListener('click', function () {
    window.location.href = 'Noughts&Crosses.html';
});
BtnLink2.addEventListener('auxclick', function () {
    if (event.which == 2) {
        window.open('Noughts&Crosses.html');
    }
});
//BtnLink3
BtnLink3.addEventListener('click', function () {
    window.location.href = 'Grid Game.html';
});
BtnLink3.addEventListener('auxclick', function () {
    if (event.which == 2) {
        window.open('Grid Game.html');
    }
});
//BtnLink4
BtnLink4.addEventListener('click', function () {
    window.location.href = 'Pong.html';
});
BtnLink4.addEventListener('auxclick', function () {
    if (event.which == 2) {
        window.open('Pong.html');
    }
});
//BtnLink5
BtnLink5.addEventListener('click', function () {
    window.location.href = 'Snake.html';
});
BtnLink5.addEventListener('auxclick', function () {
    if (event.which == 2) {
        window.open('Snake.html');
    }
});
//BtnLink6
BtnLink6.addEventListener('click', function () {
    window.location.href = 'FlappyBirb.html';
});
BtnLink6.addEventListener('auxclick', function () {
    if (event.which == 2) {
        window.open('FlappyBirb.html');
    }
});
//BtnLink7
BtnLink7.addEventListener('click', function () {
    window.location.href = 'Tetris.html';
});
BtnLink7.addEventListener('auxclick', function () {
    if (event.which == 2) {
        window.open('Tetris.html');
    }
});
//BtnLink8
BtnLink8.addEventListener('click', function () {

});
BtnLink8.addEventListener('auxclick', function () {

});