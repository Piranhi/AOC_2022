const fs = require("fs");
const { takeCoverage } = require("v8");
const puzzleInput = "09.txt";

// Constants for readability
const DIRECTIONS = {
    L: [0, -1],
    R: [0, 1],
    U: [-1, 0],
    D: [1, 0],
};

// Read input data (puzzle data)
function readInputData() {
    return fs
        .readFileSync(puzzleInput, "utf8")
        .split("\n")
        .map((line) => {
            const [direction, steps] = line.split(" ");
            return { direction, steps: parseInt(steps, 10) };
        });
}

function MoveHead(currentPosition, direction, steps) {
    const [dx, dy] = DIRECTIONS[direction];
    return [currentPosition[0] + steps * dx, currentPosition[1] + steps * dy];
}

function moveKnot(target, knot) {
    const [hx, hy] = target;
    const [tx, ty] = knot;
    const dx = Math.sign(hx - tx);
    const dy = Math.sign(hy - ty);

    // Check if head and tails are on the same row or column
    if (hx === tx || hy === ty) {
        // Head and tails are in line; move directly towards the head
        return [tx + dx, ty + dy];
    } else {
        // Move tail diagonally towards the head
        return [tx + dx, ty + (hy === ty ? 0 : dy)];
    }
}

function displayPath(pathData) {
    pathData.forEach((e) => {
        console.log(e);
    });
}

// Solving the puzzle

function solvePuzzle() {
    const puzzleData = readInputData();

    let headPosition = [0, 0];
    let knotPositions = Array.from({ length: 9 }, () => [0, 0]);
    let tailPositions = new Set(["0,0"]); // Start with initial position

    puzzleData.forEach(({ direction, steps }) => {
        for (i = 1; i <= steps; i++) {
            headPosition = MoveHead(headPosition, direction, 1); // Move Head one step at a time
            knotPositions.forEach((knot, index) => {
                const positionToCheck =
                    index === 0 ? headPosition : knotPositions[index - 1];
                if (!isAdjacent(positionToCheck, knot)) {
                    // If tails and head aren't ajacent
                    knotPositions[index] = moveKnot(positionToCheck, knot);
                }
                tailPositions.add(
                    knotPositions[knotPositions.length - 1].join(",")
                );
            });
        }
    });
    return tailPositions.size;

    //displayPath(tailPositions);
}

function isAdjacent(pos1, pos2) {
    const [x1, y1] = pos1;
    const [x2, y2] = pos2;
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    return dx <= 1 && dy <= 1;
}

const result = solvePuzzle();
console.log(`Total unique positions overlapped = ${result}`);
