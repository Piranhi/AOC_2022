function createElf(calories){
    return{
        calories: calories,
        returnTotal(){
            total = calories.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            return total;
        },
        printOutput(){
            console.log(`This elf is carrying ${this.returnTotal()} calories`);
        }
    }
}

const elf1 = createElf([1000,2000,3000]);
const elf2 = createElf([4000]);
const elf3 = createElf([7000,8000,9000]);
const elf4 = createElf([10000]);
//let elves = [elf1, elf2, elf3, elf4];

async function readElfData(){
    const fs = require('fs');

    const data = fs.readFileSync('Data.txt', 'utf8');
    const splitData = data.trim().split("\r\n\r\n").map(chunk => chunk.split("\r\n").map(Number));
    console.log(splitData[0])
    
    return splitData.map(calories => createElf(calories))
}


async function findElfWithMostCalories(){
    let correctElf;
    let maxCalories = 0;

    const elves = await readElfData();

    const sortedElves = elves.sort((elfA, elfB) => elfB.returnTotal() - elfA.returnTotal())    
    let topThree = 0;
    for(i = 0; i < 3; i++){
        topThree += sortedElves[i].returnTotal();
    }

    console.log(` Top 3 = ${topThree}`);

    elves.forEach(elf => {
        let currentElfCalories = elf.returnTotal()
        if(currentElfCalories > maxCalories){
            maxCalories = currentElfCalories;
            correctElf = elf;
        }
    });
    correctElf.printOutput();
}

findElfWithMostCalories();

