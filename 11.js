const { match } = require("assert");
const fs = require("fs");
const puzzleInput = "11Example.txt";

// Read input data (puzzle data)
function parseInputData() {
    const monkeySections = fs
        .readFileSync(puzzleInput, "utf8")
        .split(/\n\s*\n/); //.filter(Boolean)

    const monkeys = monkeySections.map((section) => {
        const lines = section.split("\n").filter((line) => line.trim());

        const monkeyName = lines[0];
        const heldItems = lines[1].match(/\d+/g).map(Number)
        console.log(` operation: ${lines[2].match(/old\s([+\-/*])\s(\d+)/)?.slice(1)}`);
        const operation = lines[2].match(/old\s([+\-/*])\s(\d+)/)?.slice(1).map((v, i) => i === 1 ? parseInt(v, 10) : -1);
        const divisionTest = lines[3].match(/\d+/);
        const throwTarget = {
            TRUE: lines[4].match(/\d+/g)?.pop(),
            FALSE: lines[5].match(/\d+/g)?.pop()
        }
        //console.log(operation[1])

        return {
            monkeyName,
            heldItems,
            operation,
            divisionTest: parseInt(divisionTest[0], 10),
            throwTarget,
        };
    });
    return monkeys;
}

function modifyWorry(item, operation) {
    const sum = operation[1]
    switch (operation[0]) {
        case "+":
            return item + sum;
        case "-":
            return item - sum;
        case "/":
            return item / sum;
        case "*":
            return item * sum;
    }
}

function playRound(monkeyData) {
    const currentMonkeyData = monkeyData;
    currentMonkeyData.forEach(monkey => {
        if (monkey.heldItems.length > 0) {
            //Inspect Items
            console.log(monkey.heldItems[0])
            monkey.heldItems = monkey.heldItems.map(item => {
                return modifyWorry(item, monkey.operation)
            })
            console.log(monkey.heldItems[0])
        }
    });
}

function beginGame(numbRounds, monkeyData) {
    for (i = 0; i < numbRounds; i++) {
        playRound(monkeyData);
    }
}

function main() {
    const monkeyData = parseInputData();
    beginGame(20, monkeyData)
    console.log(monkeyData[1].throwTarget.TRUE);
}

main();
