const fs = require("fs");
const puzzleInput = "12Example.txt";

const LEFT = [0, -1];
const RIGHT = [0, 1];
const UP = [-1, 0];
const DOWN = [1, 0];
const DIRECTIONS = [LEFT, RIGHT, UP, DOWN];

let puzzleMap = [];

let directions;

// Read input data (puzzle data)
function parseInputData() {
    puzzleMap = fs
        .readFileSync(puzzleInput, "utf8")
        .split("\n")
        .map((row) =>
            [...row.trim()].map((char) => {
                if (char === "S") {
                    return 0;
                } else if (char === "E") {
                    return 27;
                }
                return char.charCodeAt(0) - 96;
            })
        );
}

function findStartAndEnd() {
    let [start, end] = [];
    for (i = 0; i < puzzleMap.length; i++) {
        for (j = 0; j < puzzleMap[i].length; j++) {
            if (puzzleMap[i][j] === 0) {
                start = [i, j];
            } else if (puzzleMap[i][j] === 27) {
                end = [i, j];
            }
        }
    }
    return {
        start,
        end,
    };
}

function checkIsNeighbourValid(x, y) {
    return (
        x >= 0 &&
        x < puzzleMap.length &&
        y >= 0 &&
        y <= puzzleMap[0].length
    );
}

function findValidNeighbours(x, y, visited) {
    const currentHeight = puzzleMap[x][y];
    let availableLocations = [];
    for (const [dx, dy] of DIRECTIONS) {
        const queryX = x + dx,
            queryY = y + dy;

        // Check neighbour is valid + has not been visited.
        if (
            checkIsNeighbourValid(queryX, queryY) &&
            !visited.has([queryX, queryY].toString())
        ) {
            const queryHeight = puzzleMap[queryX][queryY];
            const heightDifference = queryHeight - currentHeight;
            if (heightDifference >= -1 && heightDifference <= 1) {
                availableLocations.push([queryX, queryY, heightDifference]);
            }
        }
    }

    return availableLocations.sort((a, b) => b[2] - a[2]); // Return array sorted so highest points are up top
}

function findPath(start, end) {
    let visitedLocations = [start];

    for (i = 0; i < 60; i++) {
        let currentLocation = visitedLocations[visitedLocations.length - 1];
        const nextValidLocations = findValidNeighbours(
            currentLocation[0],
            currentLocation[1]
        ).filter(
            (e) => !visitedLocations.some((v) => v[0] === e[0] && v[1] === e[1])
        ); // Filter out any locations we've already visited

        //console.log(nextValidLocations[0])
        // console.log(`Visited Locations ${visitedLocations.join('   ')}`)
        // console.log(`Next valid locations = ${nextValidLocations.join(" - ")}`);

        if (nextValidLocations.length > 0) {
            visitedLocations.push(nextValidLocations[0]);
            const [x, y] = nextValidLocations[0];
            // console.log(
            //     `Moving from ${currentLocation} to location: ${nextValidLocations[0]} with a height of ${puzzleMap[x][y]}`
            // );
            currentLocation = visitedLocations[visitedLocations.length - 1];
        } else {
            console.log("We ran out of spots to try");
            break;
        }
        const [endX, endY] = currentLocation;
        //console.log(puzzleMap[endX])
        if (Number(puzzleMap[endX][endY]) === 27) {
            console.log("WE DID IT REDDIT");
            return visitedLocations.length;
        }
    }
}

function bfsSearch(start, grid) {
    let queue = [start];
    let visited = new Set(start.toString());
    let breakout = 0
    while (queue.length > 0) {
        breakout++;
        let [x, y] = queue.shift();


        potentialLocations = findValidNeighbours(x, y, visited);
        if (potentialLocations.length > 0) {
            const nextLocation = [
                potentialLocations[0][0],
                potentialLocations[0][1],
            ];
            queue.push(nextLocation);
            visited.add(nextLocation.toString());
            console.log(`Visiting ${nextLocation}`)
        }
        if(breakout == 100){
            break;
        }
    }
}

function main() {
    parseInputData();
    const startAndEnd = findStartAndEnd();

    bfsSearch(startAndEnd.start);
    //console.log(findPath(startAndEnd.start, startAndEnd.end));
}

main();
