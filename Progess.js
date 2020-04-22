var dateTime = new Date;
var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // days in each month of the year

var time = {
    seconds: dateTime.getSeconds(),
    minutes: dateTime.getMinutes(),
    hours: dateTime.getHours(),
    days: dateTime.getDate(),
    months: dateTime.getMonth(),
    years: dateTime.getFullYear()
}

var progBars = ["pgMinute", "pgHour", "pgDay", "pgMonth", "pgYear"];
var progVal = [0, 0, 0, 0, 0];
var progMax = [60, 60, 24, daysInMonths[time.months], 12];


//work out the dateTime


function increamentSeconds() {
    if (time.seconds == 60) {
        time.seconds = 0;
        increamentMinutes();
        return;
    }
    time.seconds++;
}

function increamentMinutes() {
    if (time.minutes == 60) {
        time.minutes = 0
        increamentHours();
        return;
    }
    time.minutes++;
}

function increamentHours() {
    if (time.hours == 24) {
        time.hours = 0;
        increamentDays();
        return;
    }
    time.hours++;
}

function increamentDays() {
    if (time.day == daysInMonths[time.months]) {
        time.day = 0;
        increamentMonths();
        return;
    }
    time.day++;
}


function increamentMonths() {
    if (time.months == 12) {
        time.months = 0;
        increamentYears();
        return;
    }
    time.months++;
}

function increamentYears() {
    time.years++;
}



// Update Progs
function updateMinute() {
    progVal[0] = time.seconds;
}

function updateHour() {
    progVal[1] = time.minutes;
}

function updateDay() {
    progVal[2] = time.hours;
}

//function updateWeek() {
//    progVal[3] = time.days;
//}

function updateMonth() {
    progVal[3] = time.days;
}

function updateYear() {
    progVal[4] = time.months;
}

// prog
function render(canvId, value, max) {
    var canvas = document.getElementById(canvId);
    var context = canvas.getContext("2d");
    // clear

    //context.fillStyle = "White";
    //context.fillRect(0, 0, canvas.width, canvas.height);

    //update & render
    context.fillStyle = "Green";
    context.fillRect(0, 0, (canvas.width / max) * value, canvas.height);
}

function clear(canvId) {
    var canvas = document.getElementById(canvId);
    var context = canvas.getContext("2d");
    context.fillStyle = "White";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Trigger Updates
function updateProg() {
    updateMinute();
    updateHour();
    updateDay();
    //updateWeek();
    updateMonth();
    updateYear();
}

function renderProg() {
    for (let i = 0; i < progBars.length; i++) {
        clear(progBars[i]);
        render(progBars[i], progVal[i], progMax[i]);
    }
}

function updateAndRenderLoop() {
    updateProg();
    renderProg();
}

updateAndRenderLoop();
setInterval(increamentSeconds, 1000);
setInterval(updateAndRenderLoop, 1000);
