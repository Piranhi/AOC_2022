function readInput(filePath) {
  const fs = require("fs");
  return fs.readFileSync(filePath, "utf8").trim().split("\r\n");
}

function splitIntoCompartments(line) {
  const splitPoint = line.length / 2; // Find middle of the string
  return {
    a: line.substring(0, splitPoint),
    b: line.substring(splitPoint),
  }; // Split string into two equal compartments
}

function findIncorrectSupply(compartments) {
  for (let i = 0; i < compartments.a.length; i++) {
    if (compartments.b.includes(compartments.a.charAt(i)))
      // Find supply that's present in both compartments
      return compartments.a.charAt(i);
  }
}

function mapLetterToPriority(supply) {
  const alphabetPosition =
    supply.toLowerCase().charCodeAt(0) - "a".charCodeAt(0) + 1;
  return supply === supply.toLowerCase()
    ? alphabetPosition
    : alphabetPosition + 26;
}

function findBadge(rucksacks) {
    const [first,...rest] = rucksacks;
    for (const letter of first){
        if(rest.every(rucksack => rucksack.includes(letter))){
            return letter;
        }
    }

    console.log("Unable to find a badge.");
    return '';
//   for (let i = 0; i < rucksacks[0].length; i++) {
//     const letterToFind = rucksacks[0].charAt(i);
//     if (rucksacks[1].includes(letterToFind) && rucksacks[2].includes(letterToFind)) {
//       return letterToFind;
//     }
//   }
//   console.log("Didn't find any")
}

function calculateTotalPriorities(inputData) {
    let totalScore = 0;
    for (let i = 0; i < inputData.length; i+= 3){
        const rucksacks = inputData.slice(i, i+3);
        const badge = findBadge(rucksacks);
        if(badge){
            totalScore += mapLetterToPriority(badge);
        }
    }
    return totalScore;
//   let rucksacks = [];
//   return inputData.reduce((totalScore, line) => {
//     rucksacks.push(line);
//     if (rucksacks.length === 3) {
//       const badge = findBadge(rucksacks);
//       rucksacks = [];
//       return totalScore + findSupplyPriority(badge);
//     }
//     return totalScore;
//   }, 0);
}

function RunGame(inputFile) {
  const gameData = readInput(inputFile);
  const totalScore = calculateTotalPriorities(gameData);
  console.log(` Total score is: ${totalScore}`);
  return totalScore;
}

RunGame("03Input.txt");
