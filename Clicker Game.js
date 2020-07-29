// decleration
// info
const bMoney = document.getElementById("bMoney");
const lblMoneyPerSecond = document.getElementById("lblMoneyPerSecond");
const btnClick = document.getElementById("btnClick");

// buttons
const bClickUpgradePrice = document.getElementById("bClickUpgradePrice");
const bPerSecondUpgradePrice = document.getElementById("bPerSecondUpgradePrice");
const btnClickUpgrade = document.getElementById("btnClickUpgrade");
const btnPerSecondUpgrade = document.getElementById("btnPerSecondUpgrade");

// reset
const btnReset = document.getElementById("btnReset");

// if never logged in before then set up local storage
if (localStorage.getItem("ClickerGame-totalMoney") == null) localStorage.setItem("ClickerGame-totalMoney", "0");
if (localStorage.getItem("ClickerGame-moneyPerSecond") == null) localStorage.setItem("ClickerGame-moneyPerSecond", "0");
if (localStorage.getItem("ClickerGame-moneyPerClick") == null) localStorage.setItem("ClickerGame-moneyPerClick", "1");
if (localStorage.getItem("ClickerGame-clickUpgradePrice") == null) localStorage.setItem("ClickerGame-clickUpgradePrice", "30");
if (localStorage.getItem("ClickerGame-clickUpgrade") == null) localStorage.setItem("ClickerGame-clickUpgrade", "2");
if (localStorage.getItem("ClickerGame-perSecondUpgradePrice") == null) localStorage.setItem("ClickerGame-perSecondUpgradePrice", "80");
if (localStorage.getItem("ClickerGame-perSecondUpgrade") == null) localStorage.setItem("ClickerGame-perSecondUpgrade", "1");
if (localStorage.getItem("ClickerGame-currentTime") == null) localStorage.setItem("ClickerGame-currentTime", new Date().getTime());

// fill variables with stored data
var totalMoney = parseInt(localStorage.getItem("ClickerGame-totalMoney"));
var moneyPerSecond = parseInt(localStorage.getItem("ClickerGame-moneyPerSecond"));
var moneyPerClick = parseInt(localStorage.getItem("ClickerGame-moneyPerClick"));
var clickUpgradePrice = parseInt(localStorage.getItem("ClickerGame-clickUpgradePrice"));
var clickUpgrade = parseInt(localStorage.getItem("ClickerGame-clickUpgrade"));
var perSecondUpgradePrice = parseInt(localStorage.getItem("ClickerGame-perSecondUpgradePrice"));
var perSecondUpgrade = parseInt(localStorage.getItem("ClickerGame-perSecondUpgrade"));

// if logged in before tell how much money was gained on while logged off
if (localStorage.getItem("ClickerGame-totalMoney") != null) {
    let previousTime = parseInt(localStorage.getItem("ClickerGame-currentTime")); // get previously stored time information
    let currentTime = new Date().getTime(); // get current time
    let millisecondDifference = currentTime - previousTime; // get the difference between previous & current time
    let moneyToBeAdded = Math.floor((millisecondDifference / 1000) * moneyPerSecond); // calculate money to be added
    alert("£" + moneyToBeAdded + " gained since previous login"); // alert how much money gained since last login
    totalMoney += moneyToBeAdded; // add money to total money
}

function updatePrices() {
    // update frontend displays with updated variables
    bClickUpgradePrice.innerText = "Upgrade Click - £" + clickUpgradePrice;
    bPerSecondUpgradePrice.innerText = "UpgradePerSecond - £" + perSecondUpgradePrice;
    btnClickUpgrade.innerText = "+£" + clickUpgrade;
    btnPerSecondUpgrade.innerText = "+£" + perSecondUpgrade;
    lblMoneyPerSecond.innerText = "£" + moneyPerSecond + "/s";
    btnClick.innerText = "+£" + moneyPerClick;
    bMoney.innerText = "£" + totalMoney;

    // store variable data in localstorage
    localStorage.setItem("ClickerGame-totalMoney", totalMoney.toString());
    localStorage.setItem("ClickerGame-moneyPerSecond", moneyPerSecond.toString());
    localStorage.setItem("ClickerGame-moneyPerClick", moneyPerClick.toString());
    localStorage.setItem("ClickerGame-clickUpgradePrice", clickUpgradePrice.toString());
    localStorage.setItem("ClickerGame-clickUpgrade", clickUpgrade.toString());
    localStorage.setItem("ClickerGame-perSecondUpgradePrice", perSecondUpgradePrice.toString());
    localStorage.setItem("ClickerGame-perSecondUpgrade", perSecondUpgrade.toString());
}

// functions to update the increace buttons on click
function clickUpgradeIncreace() {
    let priceIncreace = Math.floor(Math.random() * (50 - 30)) + 30; // random num between 30 - 50
    moneyPerClick *= 2; // double money per click
    clickUpgrade *= 2; // double click upgrade
    clickUpgradePrice = Math.floor(clickUpgrade * priceIncreace); // updateClickUpgradePrice to = clickUpgrade * priceIncreace
}

function perSecondUpgradeIncreace() {
    let priceIncreace = Math.floor(Math.random() * (120 - 80)) + 80; // random num between 80 - 120
    moneyPerSecond++; // increace money per second by 1
    perSecondUpgrade++; // increace persecondupgrade by 1
    perSecondUpgradePrice = Math.floor(perSecondUpgrade * priceIncreace); // update perSecondUpgradePrice to = perSecondUpdate * priceIncreace
}

// function to save current time to local storage
function saveCurrentTime() {
    let currentTime = new Date().getTime(); // get time
    localStorage.setItem("ClickerGame-currentTime", currentTime); // store time
}

// every second run contents
setInterval(() => {
    totalMoney += moneyPerSecond; // increace total money by money per second
    // run subs
    updatePrices();
    saveCurrentTime();
}, 1000);

// on button click
btnClick.addEventListener("click", () => {
    totalMoney += moneyPerClick; // increace total money per moneyPerClick
    updatePrices();
});

// on click upgrade
btnClickUpgrade.addEventListener("click", () => {
    if (totalMoney >= clickUpgradePrice) { // if totalMoney is greater or equal to clickUpgradePrice
        totalMoney -= clickUpgradePrice; // deduct price from total money
        clickUpgradeIncreace();
    }
    updatePrices();
});

// on persecond upgrade
btnPerSecondUpgrade.addEventListener("click", () => {
    if (totalMoney >= perSecondUpgradePrice) { // if totalMoney is greater or equal to perSecondUpgradePrice
        totalMoney -= perSecondUpgradePrice; // deduct price from total money
        perSecondUpgradeIncreace();
    }
    updatePrices();
});

// on button click reset
btnReset.addEventListener("click", () => {
    // reset local storage content
    localStorage.setItem("ClickerGame-totalMoney", "0");
    localStorage.setItem("ClickerGame-moneyPerSecond", "0");
    localStorage.setItem("ClickerGame-moneyPerClick", "1");
    localStorage.setItem("ClickerGame-clickUpgradePrice", "30");
    localStorage.setItem("ClickerGame-clickUpgrade", "2");
    localStorage.setItem("ClickerGame-perSecondUpgradePrice", "80");
    localStorage.setItem("ClickerGame-perSecondUpgrade", "1");

    // fill variables with localstorage data
    totalMoney = parseInt(localStorage.getItem("ClickerGame-totalMoney"));
    moneyPerSecond = parseInt(localStorage.getItem("ClickerGame-moneyPerSecond"));
    moneyPerClick = parseInt(localStorage.getItem("ClickerGame-moneyPerClick"));
    clickUpgradePrice = parseInt(localStorage.getItem("ClickerGame-clickUpgradePrice"));
    clickUpgrade = parseInt(localStorage.getItem("ClickerGame-clickUpgrade"));
    perSecondUpgradePrice = parseInt(localStorage.getItem("ClickerGame-perSecondUpgradePrice"));
    perSecondUpgrade = parseInt(localStorage.getItem("ClickerGame-perSecondUpgrade"));
});

updatePrices();