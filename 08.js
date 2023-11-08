const fs = require("fs");

// Constants for readability
const LEFT = [0, -1];
const RIGHT = [0, 1];
const UP = [-1, 0];
const DOWN = [1, 0];
const DIRECTIONS = [LEFT, RIGHT, UP, DOWN];

// Read input data (puzzle data)
function readInputData(input) {
    return fs
        .readFileSync(input, "utf8")
        .split("\n")
        .map((line) => line.trim().split("").map(Number));
}

function isVisibleInDirection(data, tree, ver, hor, deltaVer, deltaHor) {
    let newVer = ver + deltaVer;
    let newHor = hor + deltaHor;

    while (
        newVer >= 0 &&
        newVer < data.length &&
        newHor >= 0 &&
        newHor < data[newVer].length
    ) {
        if (data[newVer][newHor] >= tree) {
            return false;
        }

        newVer += deltaVer;
        newHor += deltaHor;
    }
    return true;
}

function getScenicValue(data, tree, ver, hor, deltaVer, deltaHor) {
    let newVer = ver + deltaVer;
    let newHor = hor + deltaHor;
    let gridSpacesMoved = 0;

    while (
        newVer >= 0 &&
        newVer < data.length &&
        newHor >= 0 &&
        newHor < data[newVer].length
    ) {
        if (data[newVer][newHor] >= tree) {
          return Math.abs((ver - Math.abs(newVer)) + (hor - Math.abs(newHor)));
        }

        newVer += deltaVer;
        newHor += deltaHor;
        gridSpacesMoved++;
    }
    return gridSpacesMoved;
}

function isEdgeTree(ver, hor, height, width) {
    return ver === 0 || hor === 0 || ver === height - 1 || hor === width - 1;
}

function solvePuzzle() {
    const data = readInputData("08.txt");
    let maxScenicValue = 0;

    data.forEach((row, ver) => {
        row.forEach((tree, hor) => {
          let currentTreeScenicValue = [];
            // Check visibility in all directions
            for (const [deltaVer, deltaHor] of DIRECTIONS) {
              currentTreeScenicValue.push(getScenicValue(data, tree, ver, hor, deltaVer,deltaHor));
            }
            const currentTreeMax = currentTreeScenicValue.reduce(((acc, sum) => acc * sum))
            if (currentTreeMax > maxScenicValue){
              console.log(currentTreeScenicValue);
              maxScenicValue = currentTreeMax;
            } 
        });
    });
    console.log(`Max scenic value: ${maxScenicValue}`);
}

solvePuzzle();
