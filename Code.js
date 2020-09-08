function resizeWindow() {
    let width = (window.innerWidth - 261) + "px";
    document.getElementById("txtArea").style.width = width;
}

// event listeners for when window resize is needed
window.addEventListener("resize", resizeWindow);
window.addEventListener("load", resizeWindow);
document.addEventListener("fullscreenchange", resizeWindow);
window.addEventListener("focus", resizeWindow);

// display file

const txtArea = document.getElementById("txtArea");
const bDisplayedCodeTitle = document.getElementById("bDisplayedCodeTitle");
const generalURL = "https://raw.githubusercontent.com/Mini152/mini152.github.io/master/";

// create initial identifier
var name = "index";
var type = "html";
var identifier = name + "." + type;

function selectFileName(selectedName) {
    name = selectedName;
    identifier = name + "." + type;
    bDisplayedCodeTitle.innerText = identifier;
    getData();
}

function selectFileType(selectedType) {
    type = selectedType;
    identifier = name + "." + type;
    bDisplayedCodeTitle.innerText = identifier;
    getData();
}

async function getData() {
    let url = generalURL + identifier;
    const html = (await (await fetch(url)).text());
    txtArea.value = html;
}

getData();    



// legacy code (needed for somewhere else)

//// fetch json from Code.json
//fetch('./Code.json')
//.then(response => {
//    // handle responce (dont 100% know how this works)
//    console.log(response);
//    return response.json();
//}).then(data => {
//    // json data can be handled here
//    console.log(data);
//    // loop through all of json finding correct identifier
//    for (let i = 0; i < data.code.length; i++) {
//        if (data.code[i].identifier == identifier) {
//            // format code
//            let fileContent = data.code[i].content;
//            function replaceAll(string, search, replace) {
//                return string.split(search).join(replace);
//            }
//            // format properly
//            fileContent = replaceAll(fileContent, "<qu>", '"');
//            fileContent = replaceAll(fileContent, "<id>", "    ");
//            // paste code into text area
//            txtArea.value = fileContent;
//            return;
//        }
//    }
//    console.log(data.code[0].content)
//}).catch(error => {
//    console.log(error);
//}); 