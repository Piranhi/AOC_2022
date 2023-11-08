const fs = require("fs");
const puzzleInput = "10.txt";

// Read input data (puzzle data)
function readInputData() {
    return fs
        .readFileSync(puzzleInput, "utf8")
        .split(/\r?\n|\r/)
        .map((line) => {
            const [instruction, signalStrength] = line.split(" ");
            return {
                instruction,
                signalStrength: parseInt(signalStrength, 10),
            };
        });
}

function solvePuzzle() {
    const puzzleData = readInputData();

    // Variables
    let totalValue = 1;
    let currentCycle = 0;
    let totalSummedValue = 0;

    let pixelPosition = [-1,0]
    let crt = [];

    function incrementCycle() {
        movePixel();
        currentCycle++;
        const cyclesTocheck = [20, 60, 100, 140, 180, 220];
        if (cyclesTocheck.includes(currentCycle))totalSummedValue += totalValue * currentCycle;
    }

    function movePixel(){
        if(pixelPosition[0] < 39){
            pixelPosition[0]++
        } else {
            console.log(crt)
            crt = [];
            pixelPosition[0] = 0;
            pixelPosition[1] ++
        }
        drawPixel()
    }

    function drawPixel(){
        crt.push(((pixelPosition[0] - totalValue) >= -1 && (pixelPosition[0] - totalValue) <= 1) ? '#' : '.');
        // if(pixelPosition[0] === 39){
        //     console.log(crt)
        //     crt = [];
        // }
    }

    // Loop through puzzle data, pausing at cycles

    for (i = 0; i < puzzleData.length; i++) {

        incrementCycle();
        const { instruction, signalStrength } = puzzleData[i];
        if (instruction === "addx") {
            incrementCycle();
            totalValue += signalStrength;
        }
    }
    movePixel();
    return totalSummedValue;
}

const result = solvePuzzle();

console.log(`Total summed value is ${result}`);
