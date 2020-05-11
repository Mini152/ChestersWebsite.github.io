const lblChoices = document.getElementById("lblChoices");
const btnAddChoice = document.getElementById("btnAddChoice");
const btnClear = document.getElementById("btnClear");
const btnPick = document.getElementById("btnPick");
const lblResult = document.getElementById("lblResult");

var choices = [];

function addChoice() {
    choices.push(prompt("Please add a choice"));
    lblChoices.innerText = choices.length;
}

function clearChoices() {
    choices = [];
    lblChoices.innerText = 0;
}

function pick() {
    var rnd = Math.floor(Math.random() * choices.length);
    if (choices.length == 0) {
        lblResult.innerText = "No Choices";
        return;
    }
    lblResult.innerText = choices[rnd]; 
}

//event handler

btnAddChoice.addEventListener("click", () => {
    addChoice();
});

btnClear.addEventListener("click", () => {
    clearChoices();
});

btnPick.addEventListener("click", () => {
    pick();
});