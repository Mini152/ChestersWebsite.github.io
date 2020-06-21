function fillInRows() {
    //var divRank = document.getElementById("divRank");
    //var divScore = document.getElementById("divScore");
    //var divDate = document.getElementById("divDate");

    // creates a single label to represent a datapoint on the leaderboard
    function createLabel(type, i) {
        let divName = "div" + type;
        let div = document.getElementById(divName);
        let label = document.createElement("label");
        let br = document.createElement("br");

        // details informaton about the label for use by css styles and getelementbyid
        label.className = "lblInfo";
        label.id = "lbl" + type + i;

        // appends label and line break as child to the respective divs
        div.appendChild(label);
        div.appendChild(br);
    }
    
    // does it
    for (let i = 1; i <= 10; i++) {
        var titles = ["Rank", "Score", "Date"];
        for (let j = 0; j < 3; j++) {
            createLabel(titles[j], i);
        }
    }
}

fillInRows();
createLeaderboard("tetris");

function createLeaderboard(gameKey) {
    // get data from localstorage and fill into array;
    var scoreArr = Array(9);
    var dateArr = Array(9);

    //get data from local storage here
    // local storage format, score_date = 2300_20/6/20
    for (let i = 1; i <= 10; i++) {
        let leaderboardData = localStorage.getItem(gameKey + i);
        var score = "";
        var date = "";
        let emptyString = "";
        for (let j = 0; j < leaderboardData.length; j++) {
            if (leaderboardData[j] == "_") {
                if (score == "") {
                    score = emptyString;
                    emptyString = "";
                }
            } else {
                emptyString += leaderboardData[j];
            }
        }
        date = emptyString;
        emptyString = ""; 

        scoreArr[i - 1] = score;
        dateArr[i - 1] = date;
        //localStorage.getItem(gameKey + i);
    }
    
    // console.log the values for debugging
    for (let i = 0; i < 10; i++) {
        console.log(scoreArr[i]);
        console.log(dateArr[i]);
    }

    // applies data onto leaderboard from the previously filled arrays
    for (let i = 1; i <= 10; i++) {
        document.getElementById("lblRank" + i).innerText = i;
        document.getElementById("lblScore" + i).innerText = scoreArr[i - 1];
        document.getElementById("lblDate" + i).innerText = dateArr[i - 1];
    }
}

function workOutRanks(gameKey, newValue) {
    var scoreArr = Array(9);
    var dateArr = Array(9);
    let index = 0;
    let dateTime = new Date();

    // get the values from previous highscores & store in array
    for (let i = 1; i <= 10; i++) {
        let leaderboardData = localStorage.getItem(gameKey + i);
        var score = "";
        var date = "";
        let emptyString = "";
        for (let j = 0; j < leaderboardData.length; j++) {
            if (leaderboardData[j] == "_") {
                if (score == "") {
                    score = emptyString;
                    emptyString = "";
                }
            } else {
                emptyString += leaderboardData[j];
            }
        }
        date = emptyString;
        emptyString = "";

        scoreArr[i - 1] = score;
        dateArr[i - 1] = date;
    }

    // loop through array comparing new value to old ones,
    // if new value is bigger than old value then index = position where new value needs to be implemented
    
    for (let i = 1; i <= 10; i++) {
        if (newValue > scoreArr[i]) {
            index = i;
            break;
        }
    }

    // if new value is not bigger than any others on leaderboard then return
    // guard clause
    if (index == 0) return;

    // shifing all other highscores down the leaderboard by 1
    for (let i = 10; i > index; i--) {
        localStorage.setItem(gameKey + i, scoreArr[i - 1] + "_" + dateArr[i - 1]);
    }

    // set the indexed leaderboard spot to be the new value
    localStorage.setItem(gameKey + index, newValue + "_" + dateTime.getDate() + "/" + (dateTime.getMonth() + 1) + "/" + dateTime.getFullYear());
}

workOutRanks("tetris", "0002");





// archive
/*
let lblRank = document.createElement("label");
let lblScore = document.createElement("label");
let lblDate = document.createElement("label");
let br1 = document.createElement("br");
let br2 = document.createElement("br");
let br3 = document.createElement("br");

lblRank.claName = "lblInfo";
lblRank.id = "lblRank" + i;
lblScore.className = "lblInfo";
lblScore.id = "lblScore" + i; 
lblDate.className = "lblInfo";
lblDate.id = "lblDate" + i;

lblRank.innerText = i;
lblScore.innerText = i;
lblDate.innerText = i;

divRank.appendChild(lblRank);
divRank.appendChild(br1);
divScore.appendChild(lblScore);
divScore.appendChild(br2);
divDate.appendChild(lblDate);
divDate.appendChild(br3);
*/