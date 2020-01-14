const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
let Correct = true;
let Score = 0;
quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayInput = quoteInputElement.value.split("");
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayInput[index];
    if (character == null) {
      characterSpan.classList.remove("Correct");
      characterSpan.classList.remove("Incorrect");
      Correct = false;
    } else if (character == characterSpan.innerText) {
      characterSpan.classList.add("Correct");
      characterSpan.classList.remove("Incorrect");
      Correct = true;
    } else {
      characterSpan.classList.add("Incorrect");
      characterSpan.classList.remove("Correct");
      Correct = false;
    }
  });

  if (Correct) {
    renderNewQuote();
    incrementScore();
  }
});

const getQuote = () => {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(res => res.json())
    .then(data => data.content);
};

const renderNewQuote = async () => {
  const quote = await getQuote();
  quoteDisplayElement.innerText = "";
  quote.split("").forEach(character => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });

  quoteInputElement.value = null;
};

const incrementScore = () => {
  Score += 10;
  scoreElement.innerText = Score;
};

const Timer = () => {
  let timer = 0;
  const interval = setInterval(() => {
    timer++;
    timerElement.innerText = timer;
    if (timer == 60) {
      alert("Game Over");
      window.location.reload();
    }
  }, 1000);
};

Timer();
renderNewQuote();
