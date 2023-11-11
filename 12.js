const fs = require("fs");
const puzzleInput = "12.txt"; // Replace this with your actual file path

const DIRECTIONS = [
    [0, -1], // LEFT
    [0, 1], // RIGHT
    [-1, 0], // UP
    [1, 0], // DOWN
];

let puzzleMap = [];
let puzzleStart, puzzleEnd;
let startPositions = [];

// Parsing input and locating start and end
function parseInputData() {
    puzzleMap = fs
        .readFileSync(puzzleInput, "utf8")
        .split("\n")
        .map((row, rowIndex) => {
            return [...row.trim()].map((char, colIndex) => {
                if (char === "S") {
                    startPositions.push([rowIndex, colIndex]);
                    puzzleStart = [rowIndex, colIndex];
                    return 1;
                } else if (char === "E") {
                    puzzleEnd = [rowIndex, colIndex];
                    return 26;
                } else if (char === "a") {
                    startPositions.push([rowIndex, colIndex]);
                    return char.charCodeAt(0) - 96;
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
        const queryX = x + dx;
        const queryY = y + dy;

        if (checkIsNeighbourValid(queryX, queryY) && !visited.has(`${queryX},${queryY}`)) {
            if (puzzleMap[queryX][queryY] - puzzleMap[x][y] <= 1) {
                availableLocations.push([queryX, queryY]);
            }
        }
    }

    return availableLocations;
}

// BFS search algorithm
function bfsSearch(start) {
    let queue = [[start, 0]];
    let visited = new Set([`${start[0]},${start[1]}`]);
    let predecessor = new Map();

    while (queue.length > 0) {
        const [[x, y], steps] = queue.shift();

        if (x === puzzleEnd[0] && y === puzzleEnd[1]) {
            return steps;
        }

        for (const neighbour of findValidNeighbours(x, y, visited)) {
            const [nx, ny] = neighbour;
            let coorStr = `${nx},${ny}`;
            visited.add(coorStr);
            predecessor.set(coorStr, [x, y]);
            queue.push([neighbour, steps + 1]);
        }
    }

    return -1; // No path found
}

function reconstructPath(predecessor, end) {
    let path = [];
    let current = `${end[0]}, ${end[1]}`;
    while (predecessor.has(current)) {
        path.unshift(current.split(`,`).map(Number));
        current = `${predecessor.get(current)[0]}, ${predecessor.get(current)[1]}`;
    }
    return path;
}

parseInputData();

let shortestSteps = 0;
console.log(bfsSearch(puzzleStart));
// startPositions.forEach((start, index) => {
//     const currentSearch = bfsSearch(start);
//     //console.log(`Index: ${index}, Steps:${currentSearch}`);
//     if (currentSearch < shortestSteps && currentSearch > 0) {
//         shortestSteps = currentSearch;
//     }
// });
console.log("Steps to reach the end:", shortestSteps);
