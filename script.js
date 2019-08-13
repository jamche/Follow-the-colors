// test that script works console.log('hello world')

// namespace
const app = {};


app.init = () => {
  // need empty array to have order of color sequence
  app.colorSequence = [];

  // set array to have the selections of player
  app.chosenSequence =[];

  // turn on the game, set to false to default the game to off
  app.powerOnGame = false;

  // variable for what level player is on
  app.level;

  // if pick was correct
  app.correctPick;

  // does the program need to show the level, or is it user turn
  app.showSequence;

  // when color signals
  app.signal;

  // to clear the colors when signal shows
  app.colorInterval;

  // winner is true or false
  app.winner;

  // variables for each button
  app.powerOn = document.querySelector("#powerButton")
  app.gameOnOrOff = document.querySelector(".gameStatus")
  app.startGame = document.querySelector("#start");
  app.levelCount = document.querySelector(".level");
  app.feedback = document.querySelector(".feedback");
  // different colors
  app.redButton = document.querySelector("#red");
  app.blueButton = document.querySelector("#blue");
  app.greenButton = document.querySelector("#green");
  app.yellowButton = document.querySelector("#yellow");
  // start button plays game when clicked

  // prvent default the score

  // function to create form 
  const f = document.createElement("form");
  f.setAttribute("action", "submit")
  f.setAttribute("id", "form")

  const textInput = document.createElement("input");
  textInput.type = "text"
  textInput.id = "name"
  textInput.placeholder = "Enter Name";

  const btn = document.createElement("input")
  btn.type = "Submit"
  // btn.value = "Save"
  btn.className = "btn"
  // btn.innerHTML = "Submit"
  btn.onclick = function saveScoreOrNot() {
  const name = document.getElementById("name").value;
    if (name == "") {
      alert('Please enter a name to submit');
      return false;
    } else {
      app.newScore = {};
      // will need to create the input/form dynamically
      // saves name and value in to score
      app.newScore.name = document.getElementById("name").value;
      app.newScore.score = app.level;
      dbRef.push(app.newScore);
      console.log(app.newScore);
    }
  }

  function createForm() {
    document.querySelector(".formInfo").appendChild(f);
    document.getElementById("form").addEventListener("submit", function (e) {
      e.preventDefault();
    });
    // create inputs and button
    document.querySelector("#form").appendChild(textInput);
    document.querySelector("#form").appendChild(btn);
    document.querySelector(".btn").tabIndex = 0;
  }



  app.powerOn.addEventListener('click', (e) => {
    if (app.powerOn.checked === true) {
      // console.log('game is on')
      app.powerOnGame = true;
      app.gameOnOrOff.innerHTML = `<h3>Game is On</h3>`
    } else if(app.powerOn.checked === false) {
      // console.log('game is off')
      app.powerOnGame = false;
      app.gameOnOrOff.innerHTML = `<h3>Game is Off, turn the game on</h3>`
      app.clearGame();
      clearInterval(app.colorInterval);
    }
  }); 

  app.start = () => {
    app.winner = false;
    app.colorSequence = [];
    app.chosenSequence = [];
    app.signal = 0;
    app.colorInterval = 0;
    app.level = 1;
    app.levelCount.innerHTML = `<h3>You are on : Level ${app.level}</h3>`;
    app.correctPick = true;
    // levels of the game
    for (let i = 0; i < 3; i++) {
      // 4 colors, so multiply by 4 and add 1 to get whole number between 1 - 5, math.floor rounds down the decimal, so number will be between 1 - 4(color options)
      app.colorSequence.push(Math.floor(Math.random() * 4) + 1);
    }
    app.showSequence = true;
    console.log(app.colorSequence);
    app.colorInterval = setInterval(app.turn, 800);
  }

  app.startGame.addEventListener('click', (e) =>{

    if (app.powerOn.checked === false) {
      app.powerOnGame = false;
      console.log('game is off turn it on')
    }
    else if(app.powerOnGame === true || app.winner === false){
      console.log('game is on')
      app.start();
    }
  });



  app.turn = () => {
    // user can't interact with anything before colorSequence is done
    app.powerOnGame = false;

    if(app.signal === app.level){
      clearInterval(app.colorInterval);
      app.showSequence = false;
      //set colorss to default color
      app.clearGame();
      // user can click colors since sequence is done
      app.powerOnGame = true; 
    }

    if(app.showSequence){
      app.clearGame();
      // flashes the color depending on the number in the array
      setTimeout(() => {
        // if first item in array is one run function first....
        if (app.colorSequence[app.signal] === 1) app.first();
        if (app.colorSequence[app.signal] === 2) app.second();
        if (app.colorSequence[app.signal] === 3) app.third();
        if (app.colorSequence[app.signal] === 4) app.fourth();
        app.signal++;
      }, 200);
    }
  } 

  // functions for flashes of colors
  app.first = () =>{
    app.redButton.style.backgroundColor = 'red';
  }
  app.second = () => {
    app.blueButton.style.backgroundColor = 'deepskyblue';
  }
  app.third = () => {
    app.greenButton.style.backgroundColor = 'chartreuse';
  }
  app.fourth = () => {
    app.yellowButton.style.backgroundColor = 'yellow';
  }

  // function to clear colors when flashed
  // set them back to default color
  app.clearGame = () => {
    app.redButton.style.backgroundColor = 'firebrick';
    app.blueButton.style.backgroundColor = 'darkblue';
    app.greenButton.style.backgroundColor = 'green';
    app.yellowButton.style.backgroundColor = 'goldenrod';
  }
  app.signalFlash = () =>{
    app.first();
    app.second();
    app.third();
    app.fourth();
  }
  app.redButton.addEventListener('click',(e) =>{
    if(app.powerOnGame){
      app.chosenSequence.push(1);
      app.first();
      if(!app.winner){
        setTimeout(() => {
          app.colorsToDefault();    
        }, 200);
      }
    }
  })
  app.blueButton.addEventListener('click', (e) => {
    if (app.powerOnGame) {
      app.chosenSequence.push(2);
      app.second();
      if (!app.winner) {
        setTimeout(() => {
          app.colorsToDefault();
        }, 200);
      }
    }
  })
  app.greenButton.addEventListener('click', (e) => {
    if (app.powerOnGame) {
      app.chosenSequence.push(3);
      app.third();
      app.isCorrect();
      if (!app.winner) {
        setTimeout(() => {
          app.colorsToDefault();
        }, 200);
      }
    }
  })
  app.yellowButton.addEventListener('click', (e) => {
    if (app.powerOnGame) {
      app.chosenSequence.push(4);
      app.fourth();
      if (!app.winner) {
        setTimeout(() => {
          app.colorsToDefault();
        }, 200);
      }
    }
  })

  // set colors back to default when clicked and if game isn't over yet
  app.colorsToDefault = () =>{
    app.isCorrect();
    if (!app.winner) {
      setTimeout(() => {
        app.clearGame();
      }, 400);
    }
  }


  app.isCorrect = () => {
    if(app.chosenSequence[app.chosenSequence.length - 1] !== app.colorSequence[app.chosenSequence.length - 1]){
      // if answer is wrong
      app.correctPick = false;
    }
    // at game end
    if (app.chosenSequence.length === 3 && app.correctPick) {
      app.youWin();
    }
    if(app.correctPick === false){
      app.signalFlash();
      app.powerOnGame = false;
      app.feedback.innerHTML = '';
      app.levelCount.innerHTML = 
      `<h3>Wrong choice!</h3> 
      <h3>You made it to Level ${app.level}.<br> Restart to try again.</h3>
      <h3>Enter your name below to add your name to the scoreboard</h3>`;
      createForm();
      app.clearGame();
    }
    
    if(app.level === app.chosenSequence.length && app.correctPick && !app.winner ){
      app.feedback.innerHTML = `<h3>Correct choice!</h3>`;
      app.level++;
      app.chosenSequence = [];
      app.showSequence = true;
      app.signal = 0;
      app.levelCount.innerHTML = `<h3>Level ${app.level}</h3>`;
      // speed that the color sequence is shown
      app.colorInterval = setInterval(app.turn, 600);
    }
  }

  // game is won
  app.youWin = () => {
    app.levelCount.innerHTML = `<h3>You won, well done! Enter your name to save your score </h3>`;
    createForm();
    app.powerOnGame = false;
    app.winner = true;
  }
}
// start the app
  app.init();  

 
 

   