const fs = require("fs");
const puzzleInput = "11Example.txt";

// Read input data (puzzle data)
function parseInputData() {
    return (monkeySections = fs
        .readFileSync(puzzleInput, "utf8")
        .split(/\n\s*\n/));
}

function createMonkeys() {
    const monkeys = monkeySections.map((section) => {
        const lines = section.split("\n").filter((line) => line.trim());
        rawOperationData = lines[2].split(" ");
        const divisionTest = lines[3].match(/\d+/);

        // Create new monkey object
        return {
            monkeyName: lines[0],
            heldItems: lines[1].match(/\d+/g).map(Number),
            operation: [rawOperationData[6], rawOperationData[7]],
            divisionTest: parseInt(divisionTest[0], 10),
            throwTarget: {
                TRUE: lines[4].match(/\d+/g)?.pop(),
                FALSE: lines[5].match(/\d+/g)?.pop(),
            },
            inspectionCount: 0,

            inspect(index, monkeyData) {
                this.inspectionCount++;

                const itemToInspect = Math.floor(
                    inspectItem(this.heldItems[index], this.operation)
                );

                const targetMonkey =
                    this.findTargetMonkeyToThrowTo(itemToInspect);

                    const targetMonkeyTest = monkeyData[targetMonkey].divisionTest;

                    const newWorryLevel = itemToInspect % targetMonkeyTest;

                    console.log(`${this.monkeyName} passing ${this.heldItems[index]} to monkey ${targetMonkey} with new worry level of ${newWorryLevel}`)
                    return {
                        targetMonkey,
                        inspectedItem: newWorryLevel,

                    }


                // if (this.heldItems[index] / divisionTest) {
                //     itemToInspect = this.heldItems[i] / divisionTest;
                // } else {
                //     itemToInspect =
                //         divisionTest + (this.heldItems[i] % divisionTest);
                // }

                // return {
                //     targetMonkey: this.findTargetMonkeyToThrowTo(itemToInspect),
                //     inspectedItem: itemToInspect,
                // };

                // const itemToInspect = Math.floor(
                //     inspectItem(this.heldItems[index], this.operation));
                // //console.log(`${this.monkeyName} - Item before: ${this.heldItems[index]}, item after: ${itemToInspect}, going to monkey: ${this.findTargetMonkeyToThrowTo(itemToInspect)}`)
                // return {
                //     targetMonkey: this.findTargetMonkeyToThrowTo(itemToInspect),
                //     inspectedItem: itemToInspect,
                // };
            },

            findTargetMonkeyToThrowTo(itemToCheck) {
                return itemToCheck % this.divisionTest === 0
                    ? this.throwTarget.TRUE
                    : this.throwTarget.FALSE;
            },

            addItemToHeld(item) {
                this.heldItems.push(Number(item));
            },
        };
    });
    return monkeys;
}

function inspectItem(item, operation) {
    const sum = isNaN(operation[1]) ? item : parseInt(operation[1]);
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
    currentMonkeyData.forEach((monkey) => {
        if (monkey.heldItems.length > 0) {
            //Inspect Items
            monkey.heldItems.forEach((item, index) => {
                const itemData = monkey.inspect(index, monkeyData);
                currentMonkeyData[itemData.targetMonkey].addItemToHeld([
                    itemData.inspectedItem,
                ]);
            });
            monkey.heldItems = [];
        }
    });
    // currentMonkeyData.forEach((e) => {
    //     console.log(`${e.monkeyName} is holding ${e.heldItems.join(",")}`);
    // });
    return currentMonkeyData;
}

function printMonkeyBusiness(index, monkeyData) {
    console.log(`Round: ${index}`);

    let totalInspectionCounts = [];
    monkeyData.sort;
    monkeyData.forEach((monkey) => {
        console.log(
            `${monkey.monkeyName} inspected ${monkey.inspectionCount} times`
        );
        totalInspectionCounts.push(monkey.inspectionCount);
    });
    totalInspectionCounts.sort((a, b) => b - a);
    //console.log(`Monkey ${totalInspectionCounts.join(' ')}`)
    return totalInspectionCounts[0] * totalInspectionCounts[1];
}

function beginGame(numbRounds, monkeyData) {
    for (i = 0; i < numbRounds; i++) {
        if (i === 20 || i === 1000 || i === 2000) {
            printMonkeyBusiness(i, monkeyData);
            //console.log(returnMonkeyBusiness(monkeyData));
        }
        monkeyData = playRound(monkeyData);
    }
}

function main() {
    const monkeyData = createMonkeys(parseInputData());
    beginGame(2, monkeyData);
}

main();
