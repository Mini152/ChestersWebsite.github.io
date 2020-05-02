const dateTime = new Date;
var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var daysInTheMonth = daysInMonths[dateTime.getMonth()];

//events

// initialising calendar
function init() {
    var bMonthTitle = document.getElementById("bMonthTitle");    

    var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];     
    var currentMonth = months[dateTime.getMonth()];

    // make title = current month
    var currentMonth = months[dateTime.getMonth()];      
    bMonthTitle.innerText = currentMonth;

    // days of the month displayed
    for (let i = 1; i <= daysInTheMonth; i++) {
        document.getElementById("divDayTitle" + (i + getTheFirstDayOfMonth() - 1)).innerText = i; // getFirstDayOfMonth() - 1 because divDay's start on 0
    }

    // days not used hidden
    for (let i = 0; i <= 36; i++) {
        if (document.getElementById("divDayTitle" + i).innerText == "") {
            document.getElementById("divDay" + i).style.visibility = "hidden";
        }

    }

    // highlighting today
    document.getElementById("divDay" + ((dateTime.getDate() - 1) + getTheFirstDayOfMonth())).style.borderColor = "red"; // -1 because date starts on 1 and calender starts on 0
}

function getTheFirstDayOfMonth() {
    var month = dateTime.getMonth();
    var year = dateTime.getFullYear();
    var firstDay = new Date(year, month, 1);
    var firstDayOfMonth = firstDay.getDay() - 1; //-1 because sunday = 0 so all days shifted by 1 left
    if (firstDayOfMonth == -1) {
        firstDayOfMonth = 6;
    }
    return firstDayOfMonth; 
}

init();