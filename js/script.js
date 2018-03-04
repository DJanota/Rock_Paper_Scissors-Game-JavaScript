// scripts.js

var newGameBtn = document.getElementById('js-newGameButton'); 

var newGameElem = document.getElementById('js-newGameElement'), 
    pickElem = document.getElementById('js-playerPickElement'), 
    resultsElem = document.getElementById('js-resultsTableElement');

var playerPointsElem = document.getElementById('js-playerPoints'), 
    playerNameElem = document.getElementById('js-playerName'), 
    computerPointsElem = document.getElementById('js-computerPoints');


var pickRock = document.getElementById('js-playerPick_rock'), 
    pickPaper = document.getElementById('js-playerPick_paper'), 
    pickScissors = document.getElementById('js-playerPick_scissors');

var playerPickElem = document.getElementById('js-playerPick'), 
    computerPickElem = document.getElementById('js-computerPick'), 
    playerResultElem = document.getElementById('js-playerResult'), 
    computerResultElem = document.getElementById('js-computerResult');


// Wartości początkowe/nasłuchiwanie
newGameBtn.addEventListener('click', newGame);


var gameState = 'notStarted', //started // ended 
    player = { 
      name: '', 
      score: 0 
    }, 
    computer = { 
      score: 0 
    };
    
// functions

function newGame() { 
  player.name = prompt("Please enter your name", "Player's name"); 
  if (player.name) { 
    player.score = computer.score = 0; 
    gameState = 'started'; 
    setGameElements(); 
    
    playerNameElem.innerHTML = player.name;
    
    setGamePoints();
  } 
}


function setGameElements() { 
  switch(gameState) { 
    case 'started': 
      newGameElem.style.display = 'none'; 
      pickElem.style.display = 'block'; 
      resultsElem.style.display = 'block'; 
    break; 
  case 'ended': 
      newGameBtn.innerText = 'Once again'; 
  case 'notStarted': 
    default: 
      newGameElem.style.display = 'block'; 
      pickElem.style.display = 'none'; 
      resultsElem.style.display = 'none'; 
   } 
}

function setGamePoints() { 
  playerPointsElem.innerHTML = player.score; 
  computerPointsElem.innerHTML = computer.score; 
}

function getComputerPick() { 
  var possiblePicks = ['rock', 'paper', 'scissors']; 
  return possiblePicks[Math.floor(Math.random()*3)]; 
}

function playerPick(playerPick) { 
  var computerPick = getComputerPick();
  
  playerPickElem.innerHTML = playerPick; 
  computerPickElem.innerHTML = computerPick;
  
  checkRoundWinner(playerPick, computerPick);
}


function checkRoundWinner(playerPick, computerPick) { 
  playerResultElem.innerHTML = computerResultElem.innerHTML = ''; 
  
  var winnerIs = 'player'; 
  
    if (playerPick == computerPick) { 
      winnerIs = 'none'; // remis 
    } else if ( 
      (computerPick == 'rock' && playerPick == 'scissors') ||  (computerPick == 'scissors' && playerPick == 'paper') || (computerPick == 'paper' && playerPick == 'rock')) { 
      
      winnerIs = 'computer'; 
    } else {
      winnerIs = 'player';
    }
  
  
  if (winnerIs == 'player') { 
    playerResultElem.innerHTML = "Win!"; 
    player.score++; 
  } else if (winnerIs == 'computer') { 
    computerResultElem.innerHTML = "Win!"; 
    computer.score++; 
  } 
  
  setGamePoints();
  
  if((player.score == 10) || (computer.score == 10)) endOfTheGame();
}

function endOfTheGame() {
  if (player.score == 10) {
    alert("The winner is " + player.name);
  } else {
    alert("Computer wins!");
  }
  
  gameState ="ended";
  
  setGameElements()
}


pickRock.addEventListener('click', function() { 
  playerPick('rock') });
pickPaper.addEventListener('click', function() { 
  playerPick('paper') });
pickScissors.addEventListener('click', function() { 
  playerPick('scissors') });


setGameElements();
