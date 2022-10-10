var startQuizBtn = document.querySelector("#start-quiz");
var possibleAnswersEl = document.querySelector("#choices");
var quizQuestionEl = document.querySelector("#question");

var questions = [
  {
      question: "What does DOM stand for?",
      possibleAnswers: [
          "Document Object Model",
          "Domain Object Mountain",
          "Doolittle Orange Man",
          "Duck Overview Management"
      ],
      correctAnswer: "Document Object Model"
  }
];








startQuizBtn.addEventListener("click", startQuiz);


function startQuiz(){
    var currentQuestion = questions[0];
    quizQuestionEl.textContent = currentQuestion.question;

    for (var i = 0; i <currentQuestion.possibleAnswers.length; i++){

      var li = document.createElement("li");
      li.textContent = currentQuestion.possibleAnswers[i];
      possibleAnswersEl.appendChild(li);
    }
    startQuizBtn.setAttribute("style", "display:none;")
}