function readInput(filePath) {
  const fs = require("fs");
  return fs.readFileSync(filePath, "utf8").trim().split("\r\n");
}

function findOverlappingEntries(inputData) {
  let  totalOverlaps = 0;
  for (let i = 0; i < inputData.length ; i++) {
    const assignments = inputData[i].split(",");
    const numberedAssignments = assignments.map((assignment) => {
      const [min, max] = assignment.split("-").map(Number);
      return createNumbersArray(min, max);
    });
    //console.log(` First: ${numberedAssignments[0]} + Last ${numberedAssignments[1]}`)

    if(numberedAssignments[0].some((num) => numberedAssignments[1].includes(num))){
        totalOverlaps++;
    }
    // const anyOverlaps = numberedAssignments[0].some((num) => numberedAssignments[1].includes(num));
    // const isSubsetOne = numberedAssignments[0].every((num) =>
    //   numberedAssignments[1].includes(num)
    // );

    // const isSubsetTwo = numberedAssignments[1].every((num) =>
    //   numberedAssignments[0].includes(num)
    // );

    // if (isSubsetOne || isSubsetTwo){
    //     totalOverlaps++;
    // } 
  }
  return totalOverlaps;
}

function createNumbersArray(min, max) {
  let returnArray = [];
  for (let i = min; i <= max; i++) {
    returnArray.push(i);
  }
  return returnArray;
}

function RunPuzzle(inputFile) {
  const puzzleData = readInput(inputFile);
  console.log(findOverlappingEntries(puzzleData));
}

RunPuzzle("04Input.txt");
