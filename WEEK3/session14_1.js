
console.log("----- Match Score Management -----");

const matchName = "India vs Australia"; // const (won’t change)
let score = 0; // let (can change)

function addRuns(runs) {
    score += runs;
    console.log(`Added ${runs} runs. Current Score: ${score}`);
}

function resetScore() {
    score = 0;
    console.log("Score has been reset.");
}

addRuns(4);
addRuns(6);
resetScore();