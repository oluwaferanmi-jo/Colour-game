const colors = ["#a8dadc", "#457b9d", "#1d3557", "#6FCF97", "#e63946", "#ffb703"];
let targetColor;
let score = 0;
let level = 1;
let timerInterval;
let timerEnabled = false; 

function createColorButtons() {
  const container = document.getElementById("colorOptions");
  container.innerHTML = ""; 

  
  const shuffled = [...colors].sort(() => Math.random() - 0.5);

  
  if (!shuffled.includes(targetColor)) {
    const randIndex = Math.floor(Math.random() * shuffled.length);
    shuffled[randIndex] = targetColor;
  }

  
  shuffled.forEach(color => {
    const btn = document.createElement("button");
    btn.style.backgroundColor = color;
    btn.setAttribute("data-testid", "colorOption");
    btn.addEventListener("click", () => checkGuess(color));
    container.appendChild(btn);
  });
}

function setNewColor() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById("colorBox").style.backgroundColor = targetColor;
}

function updateStatus() {
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("level").innerText = `Level ${level}`;
}


function startTimer() {
  let timeLeft = 5;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerText = timeLeft;

  
  const timerCircle = document.querySelector(".timer-circle");
  timerCircle.style.animation = "none";
  void timerCircle.offsetWidth; 
  timerCircle.style.animation = "timerEffect 5s linear forwards";

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      document.getElementById("gameStatus").innerText = `Time up! 😔`;
     
      setTimeout(() => {
        showPopup(" Sorry, Timeout😔!", `Your score is ${score}`);
      }, 1000);
      score = 0;
      level = 1;
      updateStatus();
    }
  }, 1000);
}


function showPopup(message, scoreMessage) {
  clearInterval(timerInterval);
  document.getElementById("popup-message").innerText = message;
  document.getElementById("popup-score").innerText = scoreMessage;
  document.getElementById("popup").style.display = "flex";
}

function newGame() {
  clearInterval(timerInterval);
  score = 0;
  level = 1;
  timerEnabled = false;
  updateStatus();
  startGame();
}


function checkGuess(selectedColor) {
  if (!timerEnabled) {
    timerEnabled = true;
  }
  clearInterval(timerInterval);
  document.querySelector(".timer-circle").style.animation = "none";

  if (selectedColor === targetColor) {
    document.getElementById("gameStatus").innerText = `Correct! 🎉`;
    score++;
    level++;
    if (level > 10) {
      showPopup("Congratulations!", `You completed 10 levels with a score of ${score}!`);
      return;
    }
  } else {
    document.getElementById("gameStatus").innerText = `Wrong! 😔`;
    showPopup("Wrong Guess!", `Your score is ${score}`);
    score = 0;
    level = 1;
    updateStatus();
    return;
  }
  updateStatus();
  setTimeout(startGame, 500);
}

function quitGame() {
    document.body.innerHTML = ""; 
}

function startGame() {
  document.getElementById("popup").style.display = "none";
  setNewColor();
  createColorButtons();
  document.getElementById("gameStatus").innerText = "Pick a color";
  if (timerEnabled) {
    startTimer();
  } else {
    document.getElementById("timer").innerText = 5;
  }
  updateStatus();
}


document.getElementById("newGameButton").addEventListener("click", newGame);

document.getElementById("quitButton").addEventListener("click", quitGame);

startGame();
