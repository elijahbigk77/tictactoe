"use strict";
// JavaScript code for the Tic-Tac-Toe game

// Add a variable to store the player names
let player1Name = 'Player 1';
let player2Name = 'Player 2';

// Add a function to show the start game popup
function showStartGamePopup() {
  const startGamePopup = document.getElementById('startGamePopup');
  startGamePopup.style.display = 'block';

  // Add a click event listener to the "Start Game" button
  const startGameButton = document.getElementById('startGameButton');
  startGameButton.addEventListener('click', () => {
    startGamePopup.style.display = 'none'; // Hide the popup
  });
}

// Update the player names on the scoreboard
function updatePlayerNames(player1Name, player2Name) {
  const player1Label = document.getElementById('player1Label');
  const player2Label = document.getElementById('player2Label');

  player1Label.textContent = `${player1Name} - (X):`;
  player2Label.textContent = `${player2Name} - (O):`;
}

// Function to show the start game popup
function showStartGamePopup() {
  const startGamePopup = document.getElementById('startGamePopup');
  startGamePopup.style.display = 'block';

  // Handle the form submission
  const playerNamesForm = document.getElementById('playerNamesForm');
  playerNamesForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    const player1NameInput = document.getElementById('player1Name');
    const player2NameInput = document.getElementById('player2Name');

    const player1Name = player1NameInput.value;
    const player2Name = player2NameInput.value;

    if (player1Name && player2Name) {
      // Update player names on the scoreboard
      updatePlayerNames(player1Name, player2Name);
      startGamePopup.style.display = 'none'; // Hide the popup
    } else {
      alert('Please enter names for both players.');
    }
  });
}

// Call the showStartGamePopup function when the page loads
window.addEventListener('load', showStartGamePopup);


// Function to Create Confetti 
function createConfetti() {
  const confettiColors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f']; // Define possible colors
  const confettiCount = 100; // Number of confetti pieces
  const container = document.querySelector('body'); // Container to append confetti
  

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    // Randomize position and rotation
    const xPos = Math.random() * window.innerWidth;
    const yPos = Math.random() * window.innerHeight;
    const rotation = Math.random() * 360;

    // Randomly select a color from the array
    const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];

    // Apply styles
    confetti.style.left = `${xPos}px`;
    confetti.style.top = `${yPos}px`;
    confetti.style.transform = `rotate(${rotation}deg)`;
    confetti.style.backgroundColor = randomColor; // Set the random color

    // Append to container
    container.appendChild(confetti);

    // Remove confetti after animation
    confetti.addEventListener('animationiteration', () => {
      container.removeChild(confetti);
    });
  }
}


// Initialize scores
let scoreX = 0;
let scoreO = 0;

// Function to update the scoreboard
function updateScoreboard() {
  const scoreXElement = document.getElementById('scoreX');
  const scoreOElement = document.getElementById('scoreO');

  scoreXElement.textContent = scoreX;
  scoreOElement.textContent = scoreO;
}

// Function to increase the score for Player X
function increaseScoreX() {
  scoreX++;
  updateScoreboard();
}

// Function to increase the score for Player O
function increaseScoreO() {
  scoreO++;
  updateScoreboard();
}

// Initialize variables to keep track of the game state
let currentPlayer = 'X'; // 'X' starts the game
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 9 cells on the board
document.getElementById('currentPlayer').textContent = currentPlayer;
let winningCombination = null; // Variable to store the winning combination

// Function to handle a cell click
function handleCellClick(cellIndex) {
  // Check if the cell is empty and the game is not over
  if (gameBoard[cellIndex] === '' && !isGameOver()) {
    // Set the current player's symbol in the clicked cell
    gameBoard[cellIndex] = currentPlayer;

    // Update the cell's content and color based on the current player
    const cellElement = document.getElementById(`cell-${cellIndex}`);
    cellElement.textContent = currentPlayer;
    cellElement.classList.add(currentPlayer === 'X' ? 'cell-x' : 'cell-o');

    // Check if the game is over after this move
    if (isGameOver()) {
      displayWinner();
    } else {
      // Switch to the other player and alternate colors
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      // Update the current player's turn on the page
      document.getElementById('currentPlayer').textContent = "Player " + currentPlayer;

      // Call the AI's turn after the player's move
      handleAITurn();
    }
  }
}

// Function to check if the game is over
function isGameOver() {
  // Check for a win
  if (checkWin()) {
    return true;
  }

  // Check for a draw (no empty cells left)
  if (!gameBoard.includes('')) {
    return true;
  }

  return false; // The game is not over
}

// Function to check for a win
function checkWin() {
  // Define winning combinations
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  // Check if any winning combination is present
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      winningCombination = combo; // Store the winning combination
      return true; // We have a winner
    }
  }

  return false; // No win
}

// Function to check for a draw
function checkDraw() {
  return !gameBoard.includes('') && !checkWin();
}

function displayWinner() {
  const winnerMessage = document.getElementById('winner-message');
  const winnerPopup = document.getElementById('winner-popup');
  const drawPopup = document.getElementById('draw-popup');
  const winningCombinationDisplay = document.getElementById('winning-combination');

  if (isGameOver()) {
    if (checkDraw()) {
      // It's a draw
      drawPopup.style.display = 'block'; // Show the draw message popup
      winnerPopup.style.display = 'none'; // Hide the winner message popup

      // Add a click event listener to the "Restart Game" button in the draw popup
      const restartDrawButton = document.getElementById('restartDrawButton');
      restartDrawButton.addEventListener('click', () => {
        // Reset the game and hide the draw popup
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach((cell) => {
          cell.textContent = '';
          cell.classList.remove('cell-x', 'cell-o');
        });
        currentPlayer = 'X';
        drawPopup.style.display = 'none'; // Hide the draw message popup
      });
    } else if (checkWin()) { // Check for a win condition
      // There's a winner
      const winner = currentPlayer === 'X' ? player1Name : player2Name;
      winnerMessage.textContent = `Winner: ${winner}`;

      // Display the winning combination
      winningCombinationDisplay.textContent = `Winning Combination:Cells ${winningCombination.join(', ')}`;
      winningCombinationDisplay.style.display = 'block';


      winnerPopup.style.display = 'block';
      drawPopup.style.display = 'none'; // Hide the draw message popup

      // Update scores for the winner
      if (currentPlayer === 'X') {
        increaseScoreX();
      } else {
        increaseScoreO();
      }

      // Add confetti when there's a winner
      createConfetti();

      // Add a click event listener to the "Restart Game" button in the winner popup
      const restartGameButton = document.getElementById('restartGameButton');
      restartGameButton.addEventListener('click', () => {
        // Reset the game and hide the winner popup
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach((cell) => {
          cell.textContent = '';
          cell.classList.remove('cell-x', 'cell-o');
        });
        currentPlayer = 'X';
        winnerPopup.style.display = 'none'; // Hide the winner message popup
        winningCombinationDisplay.style.display = 'none'; // Hide the winning combination
      });
    }
  }
}

// variable to track whether a game is in progress
let gameInProgress = false;
let aiModeEnabled = false;

// Function to make a random AI move
function makeRandomAIMove() {
  // Create an array of available empty cells
  const emptyCells = gameBoard.reduce((acc, cell, index) => {
    if (cell === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  // Select a random empty cell
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const selectedCellIndex = emptyCells[randomIndex];
    handleCellClick(selectedCellIndex); // Handle the AI's move
  }
}

// Function to handle the AI's turn
function handleAITurn() {
  // Check if the game is over or if it's not the AI's turn or if the AI mode is not enabled
  if (isGameOver() || currentPlayer !== 'O' || !modeToggle.checked) {
    return;
  }

  // Introduce a delay before the AI's move (in milliseconds)
  setTimeout(() => {
    makeRandomAIMove();
  }, 500); // delay time (measured in milliseconds)
}

// Event listener for the mode toggle switch
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('change', () => {
  if (gameInProgress) {
    // Disable the checkbox during the game
    modeToggle.checked = aiModeEnabled;
  } else {
    if (!aiModeEnabled) {
      aiModeEnabled = modeToggle.checked;
      if (aiModeEnabled) {
        // Player vs. Computer mode selected
        // Disable click events for cells while AI makes moves
        cells.forEach((cell) => {
          cell.removeEventListener('click', handleCellClick);
        });

        // Start the game with the AI making the first move
        currentPlayer = 'X'; // Reset the current player
        gameInProgress = true; // Set game in progress
        handleAITurn(); // Trigger the AI's move
      } else {
        // Player vs. Player mode selected
        // Enable click events for cells and reset the game
        cells.forEach((cell, index) => {
          cell.addEventListener('click', () => {
            if (aiModeEnabled) {
              handleCellClick(index); // Handle the player's move only if AI mode is enabled
            }
          });
        });

        // Reset the game board
        resetGameBoard();
      }
    }
  }
});

// Add click event listeners to each cell
const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    handleCellClick(index);
  });
});

// Call the showStartGamePopup function when the page loads
window.addEventListener('load', showStartGamePopup);