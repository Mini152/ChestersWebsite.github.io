const container = document.getElementById("container");

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    //cell.innerText = (c + 1);
    container.appendChild(cell).className = "grid-item";
    container.appendChild(cell).id = "btn" + (c + 1);
  }
}

function getStartPoint() {
    var rnd = Math.floor(Math.random() * (100 - 1 + 1)) + 1
    var btn = document.querySelector('btn' + rnd);
    btn.innerHTML = '0';
}

//getStartPoint();
makeRows(15, 15);