//buttons
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');
const btn7 = document.getElementById('btn7');
const btn8 = document.getElementById('btn8');
const btn9 = document.getElementById('btn9');

const Body = document.getElementById('Body');
const buttons = [, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9];
var AlgorithmControlNoughts = false;

function WinCondition() {
    var outcome = '0';
    var FullGridCounter = 0;
    var arr = [1, 5, 9];
    var FilledCount = 0;
    for (let j = 1; j <= 2; j++) {
        for (let i = 1; i <= 9; i += 3) {
            if (buttons[i].innerText == outcome && buttons[i + 1].innerText == outcome && buttons[i + 2].innerText == outcome) {
                EndTheGame(outcome);
                return;
            }
        }
        for (let i = 1; i <= 3; i ++) {
            if (buttons[i].innerText == outcome && buttons[i + 3].innerText == outcome && buttons[i + 6].innerText == outcome) {
                EndTheGame(outcome);
                return;
            }
        }
        for (var i = 1; i <= 2; i++) {
            FilledCount = 0;
            for (var z = 0; z < 3; z++) {
                if (buttons[arr[z]].innerText == outcome) {
                    FilledCount++;
                }
                if (FilledCount == 3) {
                    EndTheGame(outcome);
                    return;
                }
            }
            arr = [3, 5, 7];
        }
        FullGridCounter = 0;
        for (let i = 1; i <= 9; i++) {
            if (buttons[i].innerText != "") {
                FullGridCounter++;
            }
        }
        if (FullGridCounter == 9) {
            EndTheGame("");
            return;
        }
        outcome = 'X';
    }
}

function EndTheGame(WinningTeam) {
    if (WinningTeam == '0') {
        alert("Noughts Win! Clearing Board...");
        ClearBoard();
    } else if (WinningTeam == 'X') {
        alert("Crosses Win! Clearing Board...");
        ClearBoard();
    } else {
        alert("No-one Wins! Clearing Board...");
        ClearBoard();
    }
}

function GetGo(ButtonPressed) {
    if (AlgorithmControlNoughts) {
        Crosses(ButtonPressed);
    } else if (!AlgorithmControlNoughts) {
        Noughts(ButtonPressed);
    }
}

function Algorithm(algorithmTeam, oppositeTeam) {
    var arr = [1, 5, 9];
    var loopCount = 0;

    //Check for 2 oposition team in a row and block:

    //Checks horizontals for almost win
    for (var i = 1; i <= 9; i +=3) {
        var oppositionFilledCount = 0;
        var algorithmFilledCount = 0;
        for (var j = 0; j < 3; j++) {
            if (buttons[i + j].innerText == algorithmTeam) {
                algorithmFilledCount++;
            }
            if (algorithmFilledCount == 2) {
                for (var z = 0; z < 3; z++) {
                    if (buttons[i + z].innerText == "") {
                        buttons[i + z].innerText = algorithmTeam;
                        WinCondition();
                        return;
                    }
                }
            }
            if (buttons[i + j].innerText == oppositeTeam) {
                oppositionFilledCount++;
            }
            if (oppositionFilledCount == 2) {
                for (var z = 0; z < 3; z++) {
                    if (buttons[i + z].innerText == "") {
                        buttons[i + z].innerText = algorithmTeam;
                        WinCondition();
                        return;
                    }
                }
            }
        }
    }

    //Checks verticals for almost win
    for (var i = 1; i <= 3; i++) {
        var oppositionFilledCount = 0;
        var algorithmFilledCount = 0;
        for (var j = 0; j < 9; j +=3) {
            if (buttons[i + j].innerText == algorithmTeam) {
                algorithmFilledCount++;
            }
            if (algorithmFilledCount == 2) {
                for (var z = 0; z < 9; z +=3) {
                    if (buttons[i + z].innerText == "") {
                        buttons[i + z].innerText = algorithmTeam;
                        WinCondition();
                        return;
                    }
                }
            }
            if (buttons[i + j].innerText == oppositeTeam) {
                oppositionFilledCount++;
            }
            if (oppositionFilledCount == 2) {
                for (var z = 0; z < 9; z +=3) {
                    if (buttons[i + z].innerText == "") {
                        buttons[i + z].innerText = algorithmTeam;
                        WinCondition();
                        return;
                    }
                }
            }
        } 
    }

    //Checks diagonals for almost win
    for (var i = 1; i <= 2; i++) {
        var oppositionFilledCount = 0;
        var algorithmFilledCount = 0;
        for (var j = 0; j < 3; j++) {
            if (buttons[arr[j]].innerText == algorithmTeam) {
                algorithmFilledCount++;
            }
            if (algorithmFilledCount == 2) {
                for (var z = 0; z < 3; z ++) {
                    if (buttons[arr[z]].innerText == "") {
                        buttons[arr[z]].innerText = algorithmTeam;
                        WinCondition();
                        return;
                    }
                }
            }
            if (buttons[arr[j]].innerText == oppositeTeam) {
                oppositionFilledCount++;
            }
            if (oppositionFilledCount == 2) {
                for (var z = 0; z < 3; z ++) {
                    if (buttons[arr[z]].innerText == "") {
                        buttons[arr[z]].innerText = algorithmTeam;
                        WinCondition();
                        return;
                    }
                }
            }
        }
        arr = [3, 5, 7];
    }

    //if btn5 clear place algorithmTeam
    if (buttons[5].innerText == "") {
        buttons[5].innerText = algorithmTeam;
        WinCondition();
        return;
    }

    //Check for 1 algortithm team and 2 blanks in row and place

    //Checks horizontals clear grid
    for (var i = 1; i <= 9; i +=3) {
        var FilledCount = 0;
        for (var j = 0; j < 3; j++) {
            if (buttons[i + j].innerText == algorithmTeam || buttons[i + j].innerText == "") {
                FilledCount++;
            }
            if (FilledCount == 3) {
                for (var z = 0; z < 3; z++) {
                    if (buttons[i + z].innerText == "") {
                        buttons[i + z].innerText = algorithmTeam;
                        WinCondition();
                        return;
                    }
                }
            }
        }
    }

    //Checks verticals for clear grid
    for (var i = 1; i <= 3; i++) {
        var FilledCount = 0;
        for (var j = 0; j < 9; j +=3) {
            if (buttons[i + j].innerText == algorithmTeam || buttons[i + j].innerText == "") {
                FilledCount++;
            }
            if (FilledCount == 3) {
                for (var z = 0; z < 9; z +=3) {
                    if (buttons[i + z].innerText == "") {
                        buttons[i + z].innerText = algorithmTeam;
                        WinCondition();
                        return;
                    }
                }
            }
        } 
    }

    //Checks diagonals for clear grid
    for (var i = 1; i <= 2; i++) {
        var FilledCount = 0;
        for (var j = 0; j < 3; j++) {
            if (buttons[arr[j]].innerText == algorithmTeam || buttons[arr[j]].innerText == "") {
                FilledCount++;
            }
            if (FilledCount == 3) {
                for (var z = 0; z < 3; z ++) {
                    if (buttons[arr[z]].innerText == "") {
                        buttons[arr[z]].innerText = algorithmTeam;
                        WinCondition();
                        return;
                    }
                }
            }
        }
        arr = [3, 5, 7];
    }

    //random place
    while (true) {
        var rndGuess = Math.floor(Math.random() * (9 - 1 + 1) ) + 1;
        if (buttons[rndGuess].innerText == "") {
            buttons[rndGuess].innerText = algorithmTeam;
            WinCondition();
            return;
        }
        if (loopCount >= 10) {
            WinCondition();
            return;
        }
        loopCount++;
    }
}

function Noughts(ButtonPressed) {
    if (buttons[ButtonPressed].innerText == "") {
        buttons[ButtonPressed].innerText = '0';
        WinCondition();
        Algorithm('X', '0');
    }
}

function Crosses(ButtonPressed) {
    if (buttons[ButtonPressed].innerText == "") {
        buttons[ButtonPressed].innerText = 'X';
        WinCondition();
        Algorithm('0', 'X');
    }
}

function ClearBoard() {
    for (var i = 1; i <= 9; i++) {
        buttons[i] = "";
    }
    window.location.reload();
}

function WhoGoes() {
    var rndNum = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (rndNum == 1) {
        alert('Algorithm Controls Noughts');
        AlgorithmControlNoughts = true;
        Algorithm('0', 'X');
    } else if (rndNum == 2) {
        alert('Algorithm Controls Crosses');
        AlgorithmControlNoughts = false;
    }
}

Body.onload = function() {
    WhoGoes();
}
btn1.addEventListener('click', function() {
    GetGo(1);
})
btn2.addEventListener('click', function() {
    GetGo(2);
})
btn3.addEventListener('click', function() {
    GetGo(3);
})
btn4.addEventListener('click', function() {
    GetGo(4);
})
btn5.addEventListener('click', function() {
    GetGo(5);
})
btn6.addEventListener('click', function() {
    GetGo(6);
})
btn7.addEventListener('click', function() {
    GetGo(7);
})
btn8.addEventListener('click', function() {
    GetGo(8);
})
btn9.addEventListener('click', function() {
    GetGo(9);
})