const quizData = [
  {
    question: "What is HTML?",
    options: ["Language", "Framework", "Database", "Server"],
    answer: 0,
  },
  {
    question: "What is CSS used for?",
    options: ["Styling", "Logic", "Database", "Hosting"],
    answer: 0,
  },
];
// get index of the question
let currentQuestion = 0;

// setting up score for the quiz
let score = 0;

function loadQuestion() {
  //get answer from the index ( by using 'for loop' in buttons )
  let selectedOption = null;

  // takes Index from question..
  const questionNo = quizData[currentQuestion];

  // Question rendering
  document.getElementById("question").textContent = questionNo.question;

  //Option rendering
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  questionNo.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    // adding styles to class
    btn.classList.add("btn", "btn-outline-secondary", "text-start");

    // rendering option values to bn
    btn.textContent = opt;

    // choosing answer
    btn.onclick = () => {
      selectedOption = i;

      // remove old selection
      const allBtns = optionsDiv.querySelectorAll("button");
      allBtns.forEach((b) => b.classList.remove("btn-success"));

      // highlight selected
      btn.classList.remove("btn-outline-secondary");
      btn.classList.add("btn-success");
    };
    optionsDiv.appendChild(btn);
  });

  // checking answer from the questions

  // document.getElementById("nextBtn").onclick = () => {
  //   if (selectedOption === null) {
  //     alert("Please select an option");
  //     return;
  //   }
  //   if (selectedOption === quizData[currentQuestion].answer) {
  //     score++;
  //   }

  //   currentQuestion++;

  //   if (currentQuestion < quizData.length) {
  //     loadQuestion();
  //   } else {
  //     showResult();
  //   }
  // };
  const nextBtn = document.getElementById("nextBtn");

  nextBtn.onclick = () => {
    if (selectedOption === null) {
      alert("Select an option!");
      return;
    }

    nextBtn.disabled = true; // ✅ prevent double click

    const quizBox = document.getElementById("quiz-box");
    quizBox.classList.add("fade");

    setTimeout(() => {
      const currentQ = quizData[currentQuestion];

      if (selectedOption === currentQ.answer) {
        score++;
      }

      currentQuestion++;

      quizBox.classList.remove("fade");
      nextBtn.disabled = false; // ✅ enable again

      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }, 300);
  };
}

function showResult() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-box").style.display = "block";

  const scoreEl = document.querySelector("#result-box h1");

  scoreEl.textContent = score + "/" + quizData.length;

  if (score > 1) {
    scoreEl.classList.add("text-success");
  } else {
    scoreEl.classList.add("text-danger");
  }
}
loadQuestion();
