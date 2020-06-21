// link divertion

// button
var BtnLink1 = document.getElementById('btnLink1');
var BtnLink2 = document.getElementById('btnLink2');
var BtnLink3 = document.getElementById('btnLink3');
var BtnLink4 = document.getElementById('btnLink4');
var BtnLink5 = document.getElementById('btnLink5');
var BtnLink6 = document.getElementById('btnLink6');
var BtnLink7 = document.getElementById('btnLink7');
//var BtnLink8 = document.getElementById('btnLink8');
var BtnLink9 = document.getElementById('btnLink9');
var BtnLink10 = document.getElementById('btnLink10');
var BtnLink11 = document.getElementById("btnLink11");
var BtnLink12 = document.getElementById("btnLink12");

var links = [BtnLink1, BtnLink2, BtnLink3, BtnLink4, BtnLink5, BtnLink6, BtnLink7, BtnLink9, BtnLink10, BtnLink11, BtnLink12];
var htmls = ["Draw.html", "Noughts&Crosses.html", "Grid Game.html", "Pong.html", "Snake.html", "FlappyBirb.html", "Tetris.html", "Calendar.html", "3DSim.html", "Picker.html", "Reaction Time.html"];

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", () => {
        window.location.href = htmls[i];
    });
}

// dropdown menus

// divs
var divGame = document.getElementById("divGames");
var divUtility = document.getElementById("divUtility");
var divOther = document.getElementById("divOther");

// buttons
var btnGameDropdown = document.getElementById("btnGameDropdown");
var btnUtilityDropdown = document.getElementById("btnUtilityDropdown");
var btnOtherDropdown = document.getElementById("btnOtherDropdown");

var gameHidden = false;
var utilityHidden = false;
var otherHidden = false;

btnGameDropdown.addEventListener("click", () => {
    if (!gameHidden) {
        divGame.style.display = "none";
        gameHidden = true;
        btnGameDropdown.innerText = "+";
    } else if (gameHidden) {
        divGame.style.display = "inherit";
        gameHidden = false;
        btnGameDropdown.innerText = "-";
    }
});

btnUtilityDropdown.addEventListener("click", () => {
    if (!utilityHidden) {
        divUtility.style.display = "none";
        utilityHidden = true;
        btnUtilityDropdown.innerText = "+";
    } else if (utilityHidden) {
        divUtility.style.display = "inherit";
        utilityHidden = false;
        btnUtilityDropdown.innerText = "-";
    }
});

btnOtherDropdown.addEventListener("click", () => {
    if (!otherHidden) {
        divOther.style.display = "none";
        otherHidden = true;
        btnOtherDropdown.innerText = "+";
    } else if (otherHidden) {
        divOther.style.display = "inherit";
        otherHidden = false;
        btnOtherDropdown.innerText = "-";
    }
});