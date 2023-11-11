const fs = require("fs");
const puzzleInput = "13Example.txt"; // Replace this with your actual file path

// Parsing input and locating start and end
function parseInputData() {
    return fs
        .readFileSync(puzzleInput, "utf8")
        .split(/\n\s*\n/)
        .map((line) => line.split("\n"));
}

function decipherPacket(packet) {
    console.log(packet);
    console.log(JSON.parse(packet[0]));
}

function solvePuzzle() {
    unsortedSignal = parseInputData();

    // Go through each packet and try and decipher them
    sortedSignal = unsortedSignal.map((signal) => decipherPacket(signal));
}

solvePuzzle();
