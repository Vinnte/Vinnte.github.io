const songLyrics = document.getElementById("song");
const chordSet = document.getElementsByClassName("chord");
const chordsLine = document.getElementsByClassName("chords");
const lyrics = document.getElementsByClassName("lyrics");
const key = document.getElementById("key");

const chordsSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const chordsFlat = ["C", "D&#9837;", "D", "E&#9837;", "E", "F", "G&#9837;", "G", "A&#9837;", "A", "B&#9837;", "B"];
// flat &#9837; symbol makes the chords misalign, looks lower
const minorAndSeventh = ["&#8322;", "&#8324;", "&#8326;", "&#8327;", "&#8329;", "m", "m&#8322;", "m&#8324;", "m&#8326;", "m&#8327;", "m&#8329;"];
let sharpFlat = chordsSharp;

let transpose = 0;

function updateChords() {

    /*for (i=0;i<chordsLine.length;i++) {
        let lyricsLength = lyrics[i].innerHTML.length;
        
        if (lyricsLength < 30) {
            chordsLine[i].style.width = lyricsLength*24/2.2+"px";
        }
    }/*
    This line was made to wrap the size of the line of Chords to the lyrics,
    but it looked bad when the lyrics needed more than one line a.k.a. too long
    */

    for (i=0;i<chordSet.length;i++) {
        const dataScale = chordSet[i].getAttribute("data-scale");
        let currentChord = dataScale - 1 + transpose;
        const dataMin7 = chordSet[i].getAttribute("data-min7");
        let currentMin7 = "";

        if (dataMin7 && dataMin7!=0) {
            currentMin7 = minorAndSeventh[dataMin7-1];
        }

        if (currentChord > 11) {
            currentChord = currentChord % 12;
        }
        else if (currentChord < 0) {
            currentChord += 1200;
            currentChord = currentChord % 12;
        }

        chordSet[i].innerHTML = sharpFlat[currentChord]+currentMin7;

        const dataPosition = chordSet[i].getAttribute("data-position");
        chordSet[i].style.gridColumnStart = dataPosition;
    }

    let currentKey = (key.getAttribute("data-scale")) - 1 + transpose;
    if (currentKey > 11) {
        currentKey = currentKey % 12;
    }
    else if (currentKey < 0) {
        currentKey += 1200;
        currentKey = currentKey % 12;
    }
    key.innerHTML = sharpFlat[currentKey];

}
updateChords();

function whiteTheme() {
    document.documentElement.style.setProperty("--backgroundColor", "white");
    document.documentElement.style.setProperty("--fontColor", "black");
    document.documentElement.style.setProperty("--chordColor", "darkblue");
}

function warmTheme() {
    document.documentElement.style.setProperty("--backgroundColor", "antiquewhite");
    document.documentElement.style.setProperty("--fontColor", "black");
    document.documentElement.style.setProperty("--chordColor", "darkblue");
}

function darkTheme() {
    document.documentElement.style.setProperty("--backgroundColor", "black");
    document.documentElement.style.setProperty("--fontColor", "white");
    document.documentElement.style.setProperty("--chordColor", "yellow");
}

function fontA() {
    document.getElementById("main").style.fontFamily = "'Times New Roman', Times, serif";
}

function fontB() {
    document.getElementById("main").style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
}

function fontC() {
    document.getElementById("main").style.fontFamily = "cursive";
}

let zoomR = 1.0;

function zoomOut() {
    zoomR -= 0.1;
    document.getElementById("song").style.zoom = zoomR;
}

function zoomIn() {
    zoomR += 0.1;
    document.getElementById("song").style.zoom = zoomR;
}

function sharpFlats() {
    if (sharpFlat == chordsSharp) {
        sharpFlat = chordsFlat;
    }
    else {
        sharpFlat = chordsSharp;
    }

    updateChords();
}

function transposeUp() {
    transpose++;
    updateChords();
}

function transposeDown() {
    transpose--;
    updateChords();
}