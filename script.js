
const game = () => {
    let pScore = 0;
    let cScore = 0;
    let round = 1;
    const computerOptions = ["rock", "paper", "scissors"];
    const chances = document.querySelectorAll('.chances .chance');
    const resultScreen = document.querySelector('.result');
  
    const disableChances = () => {
      chances.forEach(chance => {
        chance.disabled = true;
      });
    };
  
    const enableChance = (index) => {
      chances[index].disabled = false;
    };
  
    const updateRound = () => {
      if (round <= 3) {
        enableChance(round - 1);
      } else {
        endGame();
      }
    };
  
    const startGame = () => {
      const playBtn = document.querySelector('.intro button');
      const introScreen = document.querySelector('.intro');
      const match = document.querySelector('.match');
  
      playBtn.addEventListener('click', () => {
        introScreen.classList.add('fadeOut');
        match.classList.add('fadeIn');
        updateRound();
      });
    };
  
    const playMatch = () => {
      const options = document.querySelectorAll(".options button");
      const playerHand = document.querySelector(".player-hand");
      const computerHand = document.querySelector(".computer-hand");
      const hands = document.querySelectorAll(".hands img");
  
      hands.forEach(hand => {
        hand.addEventListener("animationend", function() {
          this.style.animation = "";
        });
      });
  
      options.forEach(option => {
        option.addEventListener('click', function () {
          if (round <= 3) {
            const computerNumber = Math.floor(Math.random() * 3);
            const computerChoice = computerOptions[computerNumber];
  
            setTimeout(() => {
              compareHands(this.textContent, computerChoice);
              playerHand.src = `./assets/${this.textContent}.png`;
              computerHand.src = `./assets/${computerChoice}.png`;
              round++;
              updateRound();
            }, 10);
  
            playerHand.style.animation = 'shakePlayer 2s ease';
            computerHand.style.animation = 'shakeComputer 2s ease';
          }
        });
      });
    };
  
    const updateScore = () => {
      const playerScore = document.querySelector('.player-score p');
      const computerScore = document.querySelector('.computer-score p');
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
    }
  
    const compareHands = (playerChoice, computerChoice) => {
      const winner = document.querySelector(".winner");
      
      if (playerChoice === computerChoice) {
        winner.textContent = "It is a tie";
        return;
      }
   
      if (playerChoice === "rock") {
        if (computerChoice === "scissors") {
          winner.textContent = "Player Wins";
          pScore++;
          updateScore();
          return;
        } else {
          winner.textContent = "Computer Wins";
          cScore++;
          updateScore();
          return;
        }
      }
      
      if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
          winner.textContent = "Computer Wins";
          cScore++;
          updateScore();
          return;
        } else {
          winner.textContent = "Player Wins";
          pScore++;
          updateScore();
          return;
        }
      }
      
      if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
          winner.textContent = "Computer Wins";
          cScore++;
          updateScore();
          return;
        } else {
          winner.textContent = "Player Wins";
          pScore++;
          updateScore();
          return;
        }
      }
    };
  
    const endGame = () => {
      const match = document.querySelector('.match');
      const logo = document.querySelector('.logo');
      const gameSection = document.querySelector('.game');
      const scoreBoard = document.querySelector('.score');
      const finalResult = document.querySelector('.result h2');
      const chances = document.querySelector('.chances'); 
      let resultDisplayed = false; 
    
      match.style.display = 'none';
    
      logo.style.display = 'block';
      gameSection.style.display = 'block';
      scoreBoard.style.display = 'flex';
    
      chances.style.display = 'none';
    
      finalResult.style.display = 'block';
      resultScreen.classList.add('fadeIn');
    
      setTimeout(() => {
        if (!resultDisplayed) {
          if (pScore > cScore) {
            finalResult.textContent = `Player wins! Score: ${pScore}-${cScore}`;
            cheerWinner('Player');
          } else if (cScore > pScore) {
            finalResult.textContent = `Computer wins! Score: ${cScore}-${pScore}`;
            cheerWinner('Computer');
          } else {
            finalResult.textContent = `It's a tie! Score: ${pScore}-${cScore}`;
          }
    
          resultDisplayed = true; 
        }
      }, 1000); 
    };
    
    
  
    const cheerWinner = (winner) => {
      const cheerMessage = document.createElement('p');
      cheerMessage.textContent = `Congratulations ${winner}! Well played! 🎉`;
      cheerMessage.style.fontSize = '10px';
      cheerMessage.style.fontWeight = 'bold';
  
      resultScreen.appendChild(cheerMessage);
    };
  
    startGame();
    playMatch();
  };
  
  game();
  