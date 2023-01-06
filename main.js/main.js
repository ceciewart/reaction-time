const clickArea = document.querySelector(".click-area");
const displayText = document.querySelector(".display-text");
const scoreElements = document.querySelectorAll(".score");//this is to select every single score

const scoreHistory = [];

const minimumMSTillChange = 3000; // it will take a minimum 3000miliseconds for the colour to change from red to black blue whatevs

const maximumMSTillChange = 10000;

let msSinceEpochOnTimeout = 0;
let waitingForClick = false;

function play(){
    const msTillChange = Math.floor(Math.random() * maximumMSTillChange - minimumMSTillChange) + minimumMSTillChange;
    //console.log(msTillChange); testing if it works
    
    // reverts the colour back to red
    clickArea.style.backgroundColor = null

    displayText.textContent = "";

    setTimeout (() => {
        msSinceEpochOnTimeout = Date.now();
        clickArea.style.backgroundColor = "#009578";
        waitingForClick = true;
    }, msTillChange);
}

function addScore(score) {
    scoreHistory.unshift(score); //adding the new score to the beginning of the array;

    for (let i = 0; i < scoreHistory.length; i++) {
        const score = scoreHistory[i];

        scoreElements[i].textContent = `${score} ms`;
    }
}
clickArea.addEventListener("click", ()=> {
    if (waitingForClick) {
        const score = Date.now() - msSinceEpochOnTimeout;

        waitingForClick = false;
        displayText.textContent = `Your time was ${score} ms! Click to play again.`;

        addScore(score);

    } else {
        play();
    }
})

play();