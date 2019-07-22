// test that script works console.log('hello world')

// need empty array to have order of color sequence
let colorSequence = [];
// set array to have the selections of player
let chosenSequence =[];
// turn on the game, set to false to default the game to off
let powerOnGame = false;
// variable for what level player is on
let level;
// if pick was correct
let correctPick;
// does the program need to show the level, or is it user turn
let showSequence;
// when color signals
let signal;
// to clear the colors when signal shows
let colorInterval;
// winner is true or false
let winner;

// variables for each button
const powerOn = document.querySelector("#powerButton")
const gameOnOrOff = document.querySelector(".gameStatus")
const startGame = document.querySelector("#start");
const levelCount = document.querySelector(".level");

const redButton = document.querySelector("#red");
const blueButton = document.querySelector("#blue");
const greenButton = document.querySelector("#green");
const yellowButton = document.querySelector("#yellow");
// start button plays game when clicked

powerOn.addEventListener('click', (event) => {
  if(powerOn.checked === true){
    powerOnGame = true;
    gameOnOrOff.innerHTML = "Game is On"
  }else{
    powerOnGame = false;
    gameOnOrOff.innerHTML = "Game is off"
    clearColors();
    clearInterval(colorInterval);
  }
}); 


startGame.addEventListener('click', (e) =>{
  if(powerOnGame || winner){
    playGame();
  }
});
// play game function
const playGame =() => {
  winner = false;
  colorSequence = [];
  chosenSequence = [];
  signal = 0;
  colorInterval = 0;
  level = 1;
  levelCount.innerHTML = 1;
  correctPick = true;
  for(let i = 0; i < 10; i++){
    // 4 colors, so multiply by 4 and add 1 to get whole number between 1 - 5, math.floor rounds down the decimal, so number will be between 1 - 4(color options)
    colorSequence.push(Math.floor(Math.random() * 4) + 1);
  }
  showSequence = true;
  console.log(colorSequence);
  colorInterval = setInterval(turn, 800);
}

const turn = () => {
  // user can't touch anything before colorSequence is done
  powerOnGame = false;

  if(signal === level){
    clearInterval(colorInterval);
    showSequence = false;
    //set colros to default color
    clearColors();
    // user can click colors since sequence is done
    powerOnGame = true; 
  }

  if(showSequence){
    clearColors();
    // flashes the color depending on the number in the array
    setTimeout(() => {
      // if first item in array is one run function first....
      if (colorSequence[signal] == 1) first();
      if (colorSequence[signal] == 2) second();
      if (colorSequence[signal] == 3) third();
      if (colorSequence[signal] == 4) fourth();
      signal++;
    }, 200);
  }
} 

// functions for flashes of colors
const first = () =>{
  redButton.style.backgroundColor = 'red';
}
const second = () => {
  blueButton.style.backgroundColor = 'deepskyblue';
}
const third = () => {
  greenButton.style.backgroundColor = 'chartreuse';
}
const fourth = () => {
  yellowButton.style.backgroundColor = 'yellow';
}

// function to clear colors when flashed
// set them back to default color
const clearColors = () => {
  redButton.style.backgroundColor = 'firebrick';
  blueButton.style.backgroundColor = 'darkblue';
  greenButton.style.backgroundColor = 'green';
  yellowButton.style.backgroundColor = 'goldenrod';
}
const signalFlash = () =>{
  redButton.style.backgroundColor = 'red';
  blueButton.style.backgroundColor = 'deepskyblue';
  greenButton.style.backgroundColor = 'chartreuse'
  yellowButton.style.backgroundColor = 'yellow';
}

redButton.addEventListener('click',(e) =>{
  if(powerOnGame){
    chosenSequence.push(1);
    isCorrect();
    first();
    if(!winner){
      setTimeout(()=>{
        clearColors();
      }, 500);
    }
  }
})
blueButton.addEventListener('click', (e) => {
  if (powerOnGame) {
    chosenSequence.push(2);
    isCorrect();
    second();
    if (!winner) {
      setTimeout(() => {
        clearColors();
      }, 500);
    }
  }
})
greenButton.addEventListener('click', (e) => {
  if (powerOnGame) {
    chosenSequence.push(3);
    isCorrect();
    third();
    if (!winner) {
      setTimeout(() => {
        clearColors();
      }, 500);
    }
  }
})
yellowButton.addEventListener('click', (e) => {
  if (powerOnGame) {
    chosenSequence.push(4);
    isCorrect();
    fourth();
    if (!winner) {
      setTimeout(() => {
        clearColors();
      }, 500);
    }
  }
})

const isCorrect = () => {
  if(chosenSequence[chosenSequence.length - 1] !== colorSequence[chosenSequence.length - 1]){
    // if the pick is not correct, answer is wrong
    correctPick = false;
  }
  // at game end
  if (chosenSequence.length === 5 && correctPick) {
    youWin();
  }
  if(correctPick === false){
    signalFlash();
    levelCount.innerHTML = "Wrong choice";
    setTimeout(()=>{
      levelCount.innerHTML = level;
      clearColors();
    }, 800)
    // 
  }
  if(level === chosenSequence.length && correctPick && !winner ){
    level++;
    chosenSequence = [];
    showSequence = true;
    signal = 0;
    levelCount.innerHTML = level;
    colorInterval = setInterval(turn, 800);
  }

}

const youWin = () => {
  alert('You Win!')
  levelCount.innerHTML = "You won, nice!";
  powerOnGame = false;
  winner = true;
}