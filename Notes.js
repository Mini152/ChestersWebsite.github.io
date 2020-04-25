const btnSend = document.getElementById("btnSend");
var txtName = document.getElementById("txtName");
var txtNote = document.getElementById("txtNote");
var lblError = document.getElementById("lblError");

const dateTime = new Date;

// create note & store
function sendNoteRequest() {
    //get data out of txt
    var name = txtName;
    var note = txtNote;

    //check if values are null
    if (name.value == "") {
        //lblError.style.color = "red";
        //lblError.innerText = "Error: name cannot be null";        
        //lblError.style.visibility = "visible";
        //return;
        lblError.style.color = "black";
        lblError.innerText = "Error:";
        lblError.style.visibility = "hidden";
        name.value = "n/a"
    } else if (note.value == "") {
        lblError.style.color = "red";
        lblError.innerText = "Error: note cannot be null";        
        lblError.style.visibility = "visible";
        return;
    } else {
        lblError.style.color = "black";
        lblError.innerText = "Error:";
        lblError.style.visibility = "hidden";
    }

    //check profanities
    if (profanityFilter(name.value)) {
        lblError.style.color = "red";
        lblError.innerText = "Error: name contains a profanity";
        lblError.style.visibility = "visible";
        return;
    } else if (profanityFilter(note.value)) {
        lblError.style.color = "red";
        lblError.innerText = "Error: note contains a profanity";
        lblError.style.visibility = "visible";
        return;
    } else {
        lblError.style.color = "black";
        lblError.innerText = "Error:";
        lblError.style.visibility = "hidden";
    }

    //limit number of chars used
    if (name.value.length > 30) {
        lblError.style.color = "red";
        lblError.innerText = "Error: name is too long, " + name.value.length + "/30 characters";
        lblError.style.visibility = "visible";
        return;
    } else if (note.value.length > 250) {
        lblError.style.color = "red";
        lblError.innerText = "Error: note length is too long, " + note.value.length + "/250 characters";
        lblError.style.visibility = "visible";
        return;
    } else {
        lblError.style.color = "black";
        lblError.innerText = "Error:";
        lblError.style.visibility = "hidden";
    }

    //disallow use of underscores 
    if (name.value.includes("_")) {
        lblError.style.color = "red";
        lblError.innerText = "Error: name contains an underscore";
        lblError.style.visibility = "visible";
        return;
    } else if (note.value.includes("_")) {
        lblError.style.color = "red";
        lblError.innerText = "Error: note contains and underscore";
        lblError.style.visibility = "visible";
        return;
    } else {
        lblError.style.color = "black";
        lblError.innerText = "Error:";
        lblError.style.visibility = "hidden";
    }


    //get time of note
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var day = dateTime.getDate();
    var month = dateTime.getMonth() + 1;
    var year = dateTime.getFullYear();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var noteTime = hour + ":" + minute + "  " + day + "/" + month + "/" + year;
    

    //store data
    var noteNumber = localStorage.getItem("noteNumber");
    localStorage.setItem("note" + noteNumber, name.value + "_" + noteTime + "_" + note.value);
    noteNumber++;
    localStorage.setItem("noteNumber", noteNumber);
    window.location.reload();
}

btnSend.addEventListener("click", sendNoteRequest);

// profanity filter

function profanityFilter(input) {
    //if you are reading this code then collapse this,
    //dont judge me
    //sry chrome source users
    var profanities = [
"4r5e",
"5h1t",
"5hit",
"a55",
"anal",
"anus",
"ar5e",
"arrse",
"arse",
"ass",
"ass fucker",
"asses",
"assfucker",
"assfukka",
"asshole",
"assholes",
"asswhole",
"a_s_s",
"b!tch",
"b00bs",
"b17ch",
"b1tch",
"ballbag",
"balls",
"ballsack",
"bastard",
"beastial",
"beastiality",
"bellend",
"bestial",
"bestiality",
"bich",
"biatch",
"bitch",
"bitcher",
"bitchers",
"bitches",
"bitchin",
"bitching",
"bloody",
"blow job",
"blowjob",
"blowjobs",
"boiolas",
"bollock",
"bollok",
"boner",
"boob",
"boobs",
"booobs",
"boooobs",
"booooobs",
"booooooobs",
"breasts",
"buceta",
"bugger",
"bum",
"bunny fucker",
"butt",
"butthole",
"buttmuch",
"buttplug",
"c0ck",
"c0cksucker",
"carpet muncher",
"cawk",
"chink",
"cipa",
"cl1t",
"clit",
"clitoris",
"clits",
"cnut",
"cock",
"cock sucker",
"cockface",
"cockhead",
"cockmunch",
"cockmuncher",
"cocks",
"cocksuck ",
"cocksucked ",
"cocksucker",
"cocksucking",
"cocksucks ",
"cocksuka",
"cocksukka",
"cok",
"cokmuncher",
"coksucka",
"coon",
"cox",
"crap",
"cum",
"cummer",
"cumming",
"cums",
"cumshot",
"cunilingus",
"cunillingus",
"cunnilingus",
"cunt",
"cuntlick ",
"cuntlicker ",
"cuntlicking ",
"cunts",
"cyalis",
"cyberfuc",
"cyberfuck ",
"cyberfucked ",
"cyberfucker",
"cyberfuckers",
"cyberfucking ",
"d1ck",
"damn",
"dick",
"dickhead",
"dildo",
"dildos",
"dink",
"dinks",
"dirsa",
"dlck",
"dog - fucker",
"doggin",
"dogging",
"donkeyribber",
"doosh",
"duche",
"dyke",
"ejaculate",
"ejaculated",
"ejaculates ",
"ejaculating ",
"ejaculatings",
"ejaculation",
"ejakulate",
"f u c k",
"f u c k e r",
"f4nny",
"fag",
"fagging",
"faggitt",
"faggot",
"faggs",
"fagot",
"fagots",
"fags",
"fanny",
"fannyflaps",
"fannyfucker",
"fanyy",
"fatass",
"fcuk",
"fcuker",
"fcuking",
"feck",
"fecker",
"felching",
"fellate",
"fellatio",
"fingerfuck ",
"fingerfucked ",
"fingerfucker ",
"fingerfuckers",
"fingerfucking ",
"fingerfucks ",
"fistfuck",
"fistfucked ",
"fistfucker ",
"fistfuckers ",
"fistfucking ",
"fistfuckings ",
"fistfucks ",
"flange",
"fook",
"fooker",
"fuck",
"fucka",
"fucked",
"fucker",
"fuckers",
"fuckhead",
"fuckheads",
"fuckin",
"fucking",
"fuckings",
"fuckingshitmotherfucker",
"fuckme ",
"fucks",
"fuckwhit",
"fuckwit",
"fudge packer",
"fudgepacker",
"fuk",
"fuker",
"fukker",
"fukkin",
"fuks",
"fukwhit",
"fukwit",
"fux",
"fux0r",
"f_u_c_k",
"gangbang",
"gangbanged ",
"gangbangs ",
"gaylord",
"gaysex",
"goatse",
"God",
"god dam",
"god damned",
"goddamn",
"goddamned",
"hardcoresex",
"hell",
"heshe",
"hoar",
"hoare",
"hoer",
"homo",
"hore",
"horniest",
"horny",
"hotsex",
"jack off ",
"jackoff",
"jap",
"jerk off ",
"jism",
"jiz ",
"jizm ",
"jizz",
"kawk",
"knob",
"knobead",
"knobed",
"knobend",
"knobhead",
"knobjocky",
"knobjokey",
"kock",
"kondum",
"kondums",
"kum",
"kummer",
"kumming",
"kums",
"kunilingus",
"l3i + ch",
"l3itch",
"labia",
"lmfao",
"lust",
"lusting",
"m0f0",
"m0fo",
"m45terbate",
"ma5terb8",
"ma5terbate",
"masochist",
"master bate",
"masterb8",
"masterbat *",
"masterbat3",
"masterbate",
"masterbation",
"masterbations",
"masturbate",
"mo fo",
"mof0",
"mofo",
"mothafuck",
"mothafucka",
"mothafuckas",
"mothafuckaz",
"mothafucked ",
"mothafucker",
"mothafuckers",
"mothafuckin",
"mothafucking ",
"mothafuckings",
"mothafucks",
"mother fucker",
"motherfuck",
"motherfucked",
"motherfucker",
"motherfuckers",
"motherfuckin",
"motherfucking",
"motherfuckings",
"motherfuckka",
"motherfucks",
"muff",
"mutha",
"muthafecker",
"muthafuckker",
"muther",
"mutherfucker",
"n1gga",
"n1gger",
"nazi",
"nigg3r",
"nigg4h",
"nigga",
"niggah",
"niggas",
"niggaz",
"nigger",
"niggers ",
"nob",
"nob jokey",
"nobhead",
"nobjocky",
"nobjokey",
"numbnuts",
"nutsack",
"orgasim ",
"orgasims ",
"orgasm",
"orgasms ",
"p0rn",
"pawn",
"pecker",
"penis",
"penisfucker",
"phonesex",
"phuck",
"phuk",
"phuked",
"phuking",
"phukked",
"phukking",
"phuks",
"phuq",
"pigfucker",
"pimpis",
"piss",
"pissed",
"pisser",
"pissers",
"pisses ",
"pissflaps",
"pissin ",
"pissing",
"pissoff",
"poop",
"porn",
"porno",
"pornography",
"pornos",
"prick",
"pricks ",
"pron",
"pube",
"pusse",
"pussi",
"pussies",
"pussy",
"pussys ",
"rectum",
"retard",
"rimjaw",
"rimming",
"s hit",
"s.o.b.",
"sadist",
"schlong",
"screwing",
"scroat",
"scrote",
"scrotum",
"semen",
"sex",
"sh!+",
"sh!t",
"sh1t",
"shag",
"shagger",
"shaggin",
"shagging",
"shemale",
"shi+",
"shit",
"shitdick",
"shite",
"shited",
"shitey",
"shitfuck",
"shitfull",
"shithead",
"shiting",
"shitings",
"shits",
"shitted",
"shitter",
"shitters ",
"shitting",
"shittings",
"shitty ",
"skank",
"slut",
"sluts",
"smegma",
"smut",
"snatch",
"son of a bitch",
"spac",
"spunk",
"s_h_i_t",
"t1tt1e5",
"t1tties",
"teets",
"teez",
"testical",
"testicle",
"tit",
"titfuck",
"tits",
"titt",
"tittie5",
"tittiefucker",
"titties",
"tittyfuck",
"tittywank",
"titwank",
"tosser",
"turd",
"tw4t",
"twat",
"twathead",
"twatty",
"twunt",
"twunter",
"v14gra",
"v1gra",
"vagina",
"viagra",
"vulva",
"w00se",
"wang",
"wank",
"wanker",
"wanky",
"whoar",
"whore",
"willies",
"willy",
"xrated",
"xxx"
    ]
    for (let i = 0; i < profanities.length; i++) {
        if (input.includes(profanities[i])) {
            return true
        }
    }
    return false;
}

// displaying the previous notes

// the js code below creates this html and inserts values

//<div class="noteDiv">
//    <div class="userTimeDiv">
//        <b id="lblNoteUsername" class="noteUsername">Name Here</b>
//        <label id="lblNoteTime" class="noteTime">00:00  00/00/00</label>
//    </div>
//    <textarea id="lblNoteMessage" class="noteMessage" readonly cols="80" rows="5">Note here</textarea>
//</div>
//<br>

function loadNewNote(username, time, note) {
    const body = document.getElementById("body");
    var noteDiv = document.createElement("div"); //div
    var userTimeDiv = document.createElement("div"); //div    
    var noteUsername = document.createElement("b"); //b
    var noteTime = document.createElement("label"); // label
    var noteMessage = document.createElement("textarea"); //text area
    var br = document.createElement("br"); //br
    // giving ids and class names
    noteDiv.className = "noteDiv";
    userTimeDiv.className = "userTimeDiv";
    //noteUsername.className = "noteUsername";
    noteUsername.id = "lblNoteUsername";
    noteTime.className = "noteTime";
    noteTime.id = "lblNoteTime";
    noteMessage.className = "noteMessage";
    noteMessage.id = "lblNoteMessage";
    noteMessage.readOnly = true;
    noteMessage.cols = 80;
    noteMessage.rows = 3;
    // appending
    body.appendChild(noteDiv);
    noteDiv.appendChild(userTimeDiv);
    userTimeDiv.appendChild(noteUsername);
    userTimeDiv.appendChild(noteTime);
    noteDiv.appendChild(noteMessage);
    body.appendChild(br);
    //making ids = parsed values
    var lblUsername = document.getElementById("lblNoteUsername");
    var lblTime = document.getElementById("lblNoteTime");
    var lblMessage = document.getElementById("lblNoteMessage");
    lblUsername.innerText = username + "  -";
    lblTime.innerText = "-  " + time;
    lblMessage.innerText = note;
    //clear ids so next note can use them
    noteUsername.id = "";
    noteTime.id = "";
    noteMessage.id = "";
}

//loadNewNote("chester", "12:30  24/04/2020", "the quick brown fox jumped over the lazy dog");
//loadNewNote("chester", "12:30  24/04/2020", "the quick brown fox jumped over the lazy dog");

function createPrevNotes() {
    for (let i = 0; i < localStorage.noteNumber; i++) {
        var noteString = localStorage.getItem("note" + i);
        var emptyString = "";
        var name = "";
        var date = "";
        var note = "";
        for (let j = 0; j < noteString.length; j++) {
            if (noteString[j] == "_") {
                if (name == "") {
                    name = emptyString;
                    emptyString = "";
                } else if (date == "") {
                    date = emptyString;
                    emptyString = "";
                }
            } else {
                emptyString += noteString[j];                
            }
        }
        note = emptyString;
        emptyString = "";
        loadNewNote(name, date, note);
    }
}
createPrevNotes();

// TODO:
// profanity filter - done
// store notes - done
// display prev notes, func parced name, date, note, outputs note - done
// limit number of chars used in name and note
// disallow underscores from name and note