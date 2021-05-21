const dateTime = new Date;
var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var selectedMonth = dateTime.getMonth();
var selectedYear = dateTime.getFullYear();
var daysInTheMonth = daysInMonths[selectedMonth];

function renderCalendar() {
    var bMonthTitle = document.getElementById("bMonthTitle");    
    var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // make title = current month
    bMonthTitle.innerText = months[selectedMonth] + "  " + selectedYear;

    // clear up dayDiv(s)
    for (let i = 0; i <= 36; i++) {
        document.getElementById("divDayTitle" + i).innerText = "";
        document.getElementById("divDay" + i).style.visibility = "visible";
        document.getElementById("divDay" + i).style.borderColor = "#68C232";
    }

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

    if (selectedMonth == dateTime.getMonth() && selectedYear == dateTime.getFullYear()) {
        // highlighting today
        document.getElementById("divDay" + ((dateTime.getDate() - 1) + getTheFirstDayOfMonth())).style.borderColor = "red"; // -1 because date starts on 1 and calender starts on 0
    }
}

function getTheFirstDayOfMonth() {
    var month = selectedMonth;
    var year = selectedYear;
    var firstDay = new Date(year, month, 1);
    var firstDayOfMonth = firstDay.getDay() - 1; //-1 because sunday = 0 so all days shifted by 1 left
    if (firstDayOfMonth == -1) {
        firstDayOfMonth = 6;
    }
    return firstDayOfMonth; 
}

function nextMonth() {
    console.log("next");
    if (selectedMonth == 11) {
        selectedMonth = 0;
        selectedYear++;
    }
    else selectedMonth++;
    daysInTheMonth = daysInMonths[selectedMonth];
    renderCalendar();
}

function lastMonth() {
    console.log("prev");
    if (selectedMonth == 0) {
        selectedMonth = 11;
        selectedYear--;
    }
    else selectedMonth--;
    daysInTheMonth = daysInMonths[selectedMonth];
    renderCalendar();
}

renderCalendar();