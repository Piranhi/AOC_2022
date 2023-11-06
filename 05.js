const fs = require("fs");
const shouldPrintDebug = false;
function printDebug (debugString){
  if(shouldPrintDebug){
    console.log(debugString);
  }
  return;
}

function readInput(filePath) {
  return fs.readFileSync(filePath, "utf8").split("\r\n");
}

function sortCargo(data){
  //Calculate number of columns
  const numColumns = Math.ceil(data[0].length / 4);

  //Initialise columsn with Empty array.
  let stacks = Array.from({length: numColumns}, () => []);

  data.forEach(row => {
    for (let colIndex = 0; colIndex < numColumns; colIndex ++){
      // Extract the char for the current column from the row
      const crate = row.substr(colIndex * 4, 3).trim();
      // Add the char to the respective column array
      if(crate){
        stacks[colIndex].push(crate)
      }
    }
  });
  return stacks;
}

function runInstructions(instructions, cargo){
  const regex = /\d+/g;
  //const instruction = instructions[0];
  instructions.forEach(instruction => {
    //for(let i = 0; i < 5; i++){
      //const instruction = instructions[i];
    const [crates, start, end] = instruction.match(regex).map(Number);
    operateCrane(crates, start - 1, end - 1, cargo)
    //}
  });
}


function operateCrane(crates, start, end, cargo){
  printDebug(`Begin Crane Operation: Moving ${crates} crates from:  Cargo start: ${cargo[start]}, Cargo end: ${cargo[end]}`)
  // Splice the crates from the end to maintain the order
  let grabbedCrates = cargo[start].splice(0, crates);
  printDebug(`Grabbed crates: ${grabbedCrates}`)
  // Reverse the order because we're unshifting
  //grabbedCrates = grabbedCrates.reverse();
  // Unshift the crates onto the end of the stack to keep them in the correct order.
  cargo[end].unshift(...grabbedCrates);
  printDebug(`End Crane Operation: Cargo start: ${cargo[start]}, Cargo end: ${cargo[end]}`)
  //cargo[end].push(...cargo[start].splice(-crates));

}

function getTopCrates(cargo){
  let result = [];
  cargo.forEach(e => {
    result.push(e[0]);
  });
  return result;
}



function RunPuzzle() {
    // Query and store data
  const cargo = readInput("05Input_a.txt");
  const instructions = readInput("05Input_b.txt");

  sortedCargo = sortCargo(cargo);
  runInstructions(instructions, sortedCargo);
  console.log(getTopCrates(sortedCargo));

}

RunPuzzle();
