
const startForm = document.getElementById("startForm");
const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const questionContainer = document.getElementById("questionContainer");
const progress = document.getElementById("progress");
const summary = document.getElementById("summary");

let questions = [
  { question: "Quelle est la formule de la force ?", answer: "F = m × a", explanation: "La force est le produit de la masse par l'accélération." },
  { question: "Quel est l'unité de la puissance ?", answer: "Watt", explanation: "Le Watt est l’unité SI de la puissance." },
  { question: "Qu’est-ce qu’un arbre de transmission ?", answer: "Un élément mécanique de transmission de couple", explanation: "Il permet de transmettre une rotation ou un couple mécanique." }
];
let currentQuestion = 0;
let correctAnswers = 0;

startForm.onsubmit = function(e) {
  e.preventDefault();
  homeScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuestion();
};

function loadQuestion() {
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    questionContainer.innerHTML = `
      <h3>${q.question}</h3>
      <input type="text" id="userAnswer" placeholder="Votre réponse">
    `;
    document.getElementById("nextBtn").onclick = () => {
      let userAnswer = document.getElementById("userAnswer").value.trim();
      let explanationText = '';
      if (userAnswer.toLowerCase() === q.answer.toLowerCase()) {
        correctAnswers++;
        explanationText = "<span style='color:green;'>Bonne réponse !</span>";
      } else {
        explanationText = "<span style='color:red;'>Faux. Bonne réponse : " + q.answer + "<br>" + q.explanation + "</span>";
      }
      questionContainer.innerHTML += "<div>" + explanationText + "</div>";
      currentQuestion++;
      progress.style.width = (currentQuestion / questions.length * 100) + "%";
      document.getElementById("nextBtn").innerText = "Suivant";
      document.getElementById("nextBtn").onclick = loadQuestion;
    };
  } else {
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";
    summary.innerHTML = "<p>Score : " + correctAnswers + " / " + questions.length + "</p>";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  progress.style.width = "0%";
  resultScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuestion();
}

function goHome() {
  location.reload();
}
