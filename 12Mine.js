const fs = require("fs");
const puzzleInput = "12.txt";

const LEFT = [0, -1];
const RIGHT = [0, 1];
const UP = [-1, 0];
const DOWN = [1, 0];
const DIRECTIONS = [LEFT, RIGHT, UP, DOWN];

let puzzleMap = [];
let puzzleStart, puzzleEnd;

// Read input data (puzzle data)
function parseInputData() {
    puzzleMap = fs
        .readFileSync(puzzleInput, "utf8")
        .split("\n")
        .map((row, rowIndex) => {
            return [...row.trim()].map((char, colIndex) => {
                if (char === "S") {
                    puzzleStart = [rowIndex, colIndex];
                    return 0;
                } else if (char === "E") {
                    puzzleEnd = [rowIndex, colIndex];
                    return 27;
                }
                return char.charCodeAt(0) - 96;
            });
        });
}

function checkIsNeighbourValid(x, y) {
    return x >= 0 && x < puzzleMap.length && y >= 0 && y < puzzleMap[0].length;
}

function findValidNeighbours(x, y, visited) {
    let availableLocations = [];

    for (const [dx, dy] of DIRECTIONS) {
        const queryX = x + dx,
            queryY = y + dy;

        // Check neighbour is valid + has not been visited.
        if (checkIsNeighbourValid(queryX, queryY) && !visited.has(`${queryX},${queryY}`)) {
            if (Math.abs(puzzleMap[queryX][queryY] - puzzleMap[x][y]) <= 1) {
                availableLocations.push([queryX, queryY]);
            }
        }
    }
    return availableLocations;
}

function bfsSearch() {
    let queue = [[puzzleStart, 0]];
    let visited = new Set([`${puzzleStart[0]}, ${puzzleStart[1]}`]);
    let lastVisit;

    let totalSteps = 0;
    let breakout = 0;
    while (queue.length > 0) {
        const [[x, y], steps] = queue.shift();
        lastVisit = [x, y, steps];
        if (x === puzzleEnd[0] && y === puzzleEnd[1]) {
            console.log(`We found the path. It took ${steps} steps. We traversed ${totalSteps} steps`);
            return steps;
        }

        for (let neighbour of findValidNeighbours(x, y, visited)) {
            visited.add(`${neighbour[0]},${neighbour[1]}`);
            queue.push([neighbour, steps + 1]);
            totalSteps++;
        }
        breakout++;
        if (breakout == 1000000) {
            console.log("Breaking out");
            break;
        }
    }
    console.log(`Ran out of neighbours - Total Steps: ${totalSteps}`);
    console.log(`Visited: ${visited.size}, last visit: ${lastVisit} - ${puzzleMap[lastVisit[0]][lastVisit[1]]}`);
}

function main() {
    parseInputData();
    //const startAndEnd = findStartAndEnd();
    console.log(`Start: ${puzzleStart.toString()} - End: ${puzzleEnd.toString()}`);
    bfsSearch();

    // for (let i = 0; i < puzzleMap.length; i++) {
    //     console.log(puzzleMap[i].join("-"));
    // }
}

main();
