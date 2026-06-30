const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language",
      "Hyper Tool Multi Language",
    ],
    answer: 0,
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2,
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: 3,
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: 2,
  },
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  selectedOption = null;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-outline-secondary", "w-100", "mb-2");
    btn.textContent = option;

    btn.onclick = () => selectOption(index, btn);

    optionsEl.appendChild(btn);
  });
}

function selectOption(index, btn) {
  selectedOption = index;

  // Remove active styles
  Array.from(optionsEl.children).forEach((b) => {
    b.classList.remove("btn-success");
    b.classList.add("btn-outline-secondary");
  });

  btn.classList.remove("btn-outline-secondary");
  btn.classList.add("btn-success");
}

nextBtn.addEventListener("click", () => {
  if (selectedOption === null) {
    alert("Please select an option!");
    return;
  }

  if (selectedOption === quizData[currentQuestion].answer) {
    score++;
  }

  // Transition effect
  quizBox.classList.add("fade-out");

  setTimeout(() => {
    quizBox.classList.remove("fade-out");

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 300);
});

function showResult() {
  quizBox.classList.add("d-none");
  resultBox.classList.remove("d-none");
  document.getElementById("score").textContent =
    score + " / " + quizData.length;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedOption = null;

  resultBox.classList.add("d-none");
  quizBox.classList.remove("d-none");

  loadQuestion();
}

loadQuestion();
