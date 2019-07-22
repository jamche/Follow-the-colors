// test that script works console.log('hello world')

// namespace it
// appStart = {};


// need empty array to have order of color sequence
let colorSequence = [];
// set array to have the selections of player
let chosenSequence =[];
// turn on the game, set to false to default the game to off
let powerOnGame = false;
// variable for what level player is on
let level = 0;
// does the program need to show the level, false by default
let showSequence = '';
// when color beeps/signals
let signal;
// if pick was correct
let correctPick;
// to clear the colorInterval
let colorInterval;
// winner is true or false
let winner;

// variables for each button
const levelCount = document.querySelector(".level");
const gameOnOrOff = document.querySelector(".gameStatus")
const startGame = document.querySelector("#start");
const redButton = document.querySelector("#red");
const blueButton = document.querySelector("#blue");
const yellowButton = document.querySelector("#yellow");
const greenButton = document.querySelector("#green");
const powerOn = document.querySelector("#powerButton")
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
let playGame = () => {
  winner = false;
  colorSequence = [];
  chosenSequence = [];
  signal = 0;
  colorInterval = 0;
  level = 1
  levelCount.innerHTML = `Level ${1}`;
  correctPick = true;
  for(let i = 0; i < 5; i++){
    // 4 colors, so multiply by 4 and add 1 to get whole number between 1 - 5, math.floor rounds down the decimal, so number will be between 1 - 4(color options)
    colorSequence.push(Math.floor(Math.random() * 4) + 1);
  }
  showSequence = true;
  console.log(colorSequence);
  colorInterval = setInterval(turn, 900);
}

let turn = () =>{
  // user can't touch anything before colorSequence is done
  powerOnGame = false;
  if(signal === level){
    clearInterval(colorInterval);
    showSequence = false;
    clearColors();
    // user can click colors since sequence is done
    powerOnGame = true; 
  }
  if(showSequence){
    clearColors();
    // flashes the color depending on the number in the array
    setTimeout(()=>{
      // if first item in array is one run function first....
      if(colorSequence[signal] === 1) {
        first();
      }
      if (colorSequence[signal] === 2) {
        second();
      }
      if (colorSequence[signal] === 3) {
        third();
      }
      if (colorSequence[signal] === 4) {
        fourth();
      }
      signal++;
    }, 400);
  }
} 

// functions for flashes of colors
first = () =>{
  redButton.style.backgroundColor = 'red';
}
second = () => {
  greenButton.style.backgroundColor = 'chartreuse';
}
third = () => {
  blueButton.style.backgroundColor = 'deepskyblue';
}
fourth = () => {
  yellowButton.style.backgroundColor = 'yellow';
}

// function to clear colors when flashed
clearColors = () =>{
  redButton.style.backgroundColor = 'firebrick';
  greenButton.style.backgroundColor = 'green';
  blueButton.style.backgroundColor = 'blue';
  yellowButton.style.backgroundColor = 'goldenrod';
}

redButton.addEventListener('click',(e) =>{
  if(powerOnGame){
    chosenSequence.push(1);
    isCorrect();  
    first();
    if(!winner){
      setTimeout(()=>{
        clearColors();
      }, 300);
    }
  }
})

// greenButton.addEventListener('click',(e) =>{
//   chosenSequence.push(2);
//   isCorrect();
//   first();
//   if (!winner) {
//     setTimeout(() => {
//       clearColor();
//     }, 300);
//   }
//   console.log(chosenSequence)
// })
// blueButton.addEventListener('click', (e) => {
//   chosenSequence.push(3);
//   isCorrect();
//   first();
//   if (!winner) {
//     setTimeout(() => {
//       clearColor();
//     }, 300);
//   }
//   console.log(chosenSequence)
// })
// yellowButton.addEventListener('click', (e) => {
//   chosenSequence.push(4);
//   isCorrect();
//   first();
//   if (!winner) {
//     setTimeout(() => {
//       clearColor();
//     }, 300);
//   }
//   console.log(chosenSequence)
// })

// // check if chosen color is correct
// isCorrect=() => {
//   if(chosenSequence[chosenSequence.length - 1] !== colorSequence[colorSequence.length - 1] ){
//     correct = false;
//   }
//   if(chosenSequence === 5 && correct){
//     youWin();
//   }
//   if(correct === false){
//     // colorsEverywhere();
//     levelCount.innerHTML="nice!";
//     setTimeout(() => {
//       levelCount.innerHTML = level;
//       clearColor();
//     }, 1000);
//   }

//   if(level === colorSequence.length && correct && !winner){
//     level++;
//     colorSequence=[];
//     showSequence=true;
//     signal=0;
//     levelCount.innerHTML=level;
//     colorInterval = setInterval(turn, 1000);
//   }
// }


// youWin = () =>{
//   levelCount.innerHTML = 'Win';
//   startGame.disabled = true;
// }


// function start(){

//   appStart.init();
// }