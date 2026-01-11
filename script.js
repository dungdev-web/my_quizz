const particlesContainer = document.getElementById("particles");
for (let i = 0; i < 20; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.width = Math.random() * 4 + 2 + "px";
  particle.style.height = particle.style.width;
  particle.style.animationDelay = Math.random() * 20 + "s";
  particle.style.animationDuration = Math.random() * 10 + 15 + "s";
  particlesContainer.appendChild(particle);
}

let questions = [];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");
const timerBox = document.getElementById("timer-box");
const comboBox = document.getElementById("combo-box");
const progressFill = document.getElementById("progress-fill");
let autoNextTimeout = null;

let timeLeft = 10;
let timer = null;
let combo = 0;
let highScore = 0;

let currentQuestionIndex = 0;
let score = 0;
fetch("db.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    startQuiz();
  })
  .catch((error) => {
    questionElement.innerHTML = "Failed to load questions 😢";
    console.error("Error loading JSON:", error);
  });

startQuiz();

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  combo = 0;

  updateScore(0);
  updateCombo(0);
  updateProgress();

  nextButton.innerHTML = "Next Question →";
  showQuestion();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimer(timeLeft);

  timer = setInterval(() => {
    timeLeft--;
    updateTimer(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      autoFail();
    }
  }, 1000);
}

function autoFail() {
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  combo = 0;
  updateCombo(0);

  nextButton.style.display = "block";
  autoNextTimeout = setTimeout(handleNextButtonClick, 2000);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showQuestion() {
  resetState();
  clearTimeout(autoNextTimeout);
  startTimer();
  updateProgress();

  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `<span style="color: rgba(255,255,255,0.5)">Question ${questionNo}/${questions.length}</span><br>${currentQuestion.question}`;

  const shuffledAnswers = shuffleArray([...currentQuestion.answers]);

  shuffledAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timer);

  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    selectedButton.classList.add("correct");
    combo++;
    let bonus = combo >= 3 ? 5 : 0;
    let gained = 10 + bonus;

    score += gained;
    updateScore(gained);
    updateCombo(combo);
  } else {
    selectedButton.classList.add("incorrect");
    combo = 0;
    updateCombo(0);
  }

  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true" && button !== selectedButton) {
      button.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
  autoNextTimeout = setTimeout(handleNextButtonClick, 2000);
}

function showScore() {
  resetState();
  clearInterval(timer);

  if (score > highScore) {
    highScore = score;
  }

  const percentage = Math.round((score / (questions.length * 10)) * 100);
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (percentage / 100) * circumference;

  questionElement.innerHTML = `
                <div class="score-screen">
                    <div class="trophy-icon">🏆</div>
                    <h2>Quiz Complete!</h2>
                    
                    <div class="percentage-ring">
                        <svg width="150" height="150">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <circle class="bg" cx="75" cy="75" r="60"></circle>
                            <circle class="progress" cx="75" cy="75" r="60"
                                stroke-dasharray="${circumference}"
                                stroke-dashoffset="${offset}">
                            </circle>
                        </svg>
                        <div class="percentage-text">${percentage}%</div>
                    </div>

                    <div class="score-details">
                        <div class="score-item">
                            <span class="score-label">💎 Your Score</span>
                            <span class="score-value highlight">${score}</span>
                        </div>
                        <div class="score-item">
                            <span class="score-label">🏆 High Score</span>
                            <span class="score-value">${highScore}</span>
                        </div>
                        <div class="score-item">
                            <span class="score-label">✅ Correct Answers</span>
                            <span class="score-value">${Math.floor(
                              score / 10
                            )} / ${questions.length}</span>
                        </div>
                    </div>
                </div>
            `;

  timerBox.querySelector(".hud-value").textContent = "—";
  comboBox.querySelector(".hud-value").textContent = "0";

  nextButton.innerHTML = "🔄 Play Again";
  nextButton.style.display = "block";
}

function handleNextButtonClick() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  clearTimeout(autoNextTimeout);
  if (currentQuestionIndex < questions.length) {
    handleNextButtonClick();
  } else {
    startQuiz();
  }
});

function updateScore(gained) {
  const valueEl = scoreBox.querySelector(".hud-value");
  if (gained > 0) {
    valueEl.textContent = `${score} (+${gained})`;
    setTimeout(() => {
      valueEl.textContent = score;
    }, 1000);
  } else {
    valueEl.textContent = score;
  }
}

function updateCombo(value) {
  comboBox.querySelector(".hud-value").textContent = value;
  if (value >= 3) {
    comboBox.style.animation = "none";
    setTimeout(() => {
      comboBox.style.animation = "correctPulse 0.5s ease-out";
    }, 10);
  }
}

function updateTimer(value) {
  timerBox.querySelector(".hud-value").textContent = value;
}

function updateProgress() {
  const progress = (currentQuestionIndex / questions.length) * 100;
  progressFill.style.width = progress + "%";
}
