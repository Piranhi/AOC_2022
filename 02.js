// X = Lose, Y = Draw, Z = Win
//Rock = 1, Paper = 2, Scissors = 3

function getShapeToPlay(opponentShape,desiredOutcome){
    const plays = {
        A: { X: 'C', Y: 'A', Z: 'B' },
        B: { X: 'A', Y: 'B', Z: 'C'},
        C: { X: 'B', Y: 'C', Z: 'A'}
    }
    return plays[opponentShape][desiredOutcome];
}

function getScoreForPlay(play, desiredOutcome){
    const playScores = { 'A': 1, 'B': 2, 'C': 3}; 
    const outcomeScores = { 'X': 0, 'Y': 3, 'Z': 6};
    return playScores[play] + outcomeScores[desiredOutcome];
}

function readInput(filePath) {
  const fs = require("fs");
  return fs.readFileSync(filePath, "utf8").trim().split("\r\n");
}

function calculateTotalScore(inputData){
    return inputData.reduce((totalScore, line) =>{
        const [opponentShape, desiredOutcome] = line.split(" ");
        const playerShape = getShapeToPlay(opponentShape, desiredOutcome);
        return totalScore + getScoreForPlay(playerShape, desiredOutcome);
    }, 0);
}

function RunGame(inputFile) {
  const gameData = readInput(inputFile);
  const totalScore = calculateTotalScore(gameData);
  console.log(` Total score is: ${totalScore}`);
  return totalScore;
}
RunGame("02Input.txt");;
