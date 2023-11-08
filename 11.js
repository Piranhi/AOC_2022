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
        const heldItems = lines[1].match(/\d+/g).map(Number);
        const operation = lines[2].match(/old\s([+\-/*])\s(\d+)/)?.slice(1).map((v, i) => i === 1 ? parseInt(v, 10) : v);
        const divisionTest = lines[3].match(/\d+/);
        const throwTarget = {
            TRUE: lines[4].match(/\d+/g)?.pop(),
            FALSE: lines[5].match(/\d+/g)?.pop()
    }

        return {
            monkeyName,
            startingItems: heldItems,
            operation,
            divisionTest: parseInt(divisionTest[0], 10),
            throwTarget,
        };
    });
    return monkeys;
}

function performWorryOperation(item, operation){
    switch(operation){
        case 
    }
}

function playRound(monkeyData){
    const currentMonkeyData = monkeyData;
    monkeyData.forEach(monkey => {
        if(heldItems.length >0){
            //Inspect Items
            monkey.heldItems[0] 
        }
    });
}

function beginGame(numbRounds, monkeyData){
    for(i = 0; i<numbRounds; i++){
        playRound(monkeyData);
    }
}

function main() {
    const monkeyData = parseInputData();
    beginGame(20, monkeyData)
    console.log(monkeyData[1].throwTarget.TRUE);
}

main();
