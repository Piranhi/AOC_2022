const fs = require("fs");

const shouldPrintDebug = true;

function printDebug(debugString) {
  if (shouldPrintDebug) {
    console.log(debugString);
  }
}

function readInputData(input){
    return fs.readFileSync(input, "utf8")//.split("\r\n");

}

function checkIfAllUnique(array){
    return new Set(array).size === array.length;
}

function findSignalMarker(signal, chars){
    for(i = chars; i < signal.length; i++){
        signalByte = signal.substring(i-chars, i);
        if(checkIfAllUnique(signalByte)){
            return i;
        };
    }
    printDebug(`Marker not found`)
     
}


function solvePuzzle(){
    const signal = readInputData('06Input.txt');
    //console.log(signal)
    const signalMarker = findSignalMarker(signal, 14);
    printDebug(signalMarker);
}

solvePuzzle();