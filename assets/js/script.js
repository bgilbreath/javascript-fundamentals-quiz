var startQuizBtn = document.querySelector("#start-quiz");
var possibleAnswersEl = document.querySelector("#choices");
var quizQuestionEl = document.querySelector("#question");


//Quiz questions
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
  },
  {
  question: "JavaScript Question 2 Placeholder",
  possibleAnswers: [
      "Wrong Answer",
      "Wrong Answer",
      "Correct Answer",
      "Wrong Answer"
  ],
  correctAnswer: "Correct Answer"
  }
];


//Button starts quiz
startQuizBtn.addEventListener("click", startQuiz);

//Quiz
function startQuiz(){
  nextQuestion(0)
  startQuizBtn.setAttribute("style", "display:none;")
}


//Gets next question
function nextQuestion(nextQuestionIndex) {
  var currentQuestion = questions[nextQuestionIndex];
  quizQuestionEl.textContent = currentQuestion.question;

  
  for (var i = 0; i <currentQuestion.possibleAnswers.length; i++){
    var li = document.createElement("li");
    li.textContent = currentQuestion.possibleAnswers[i];

    li.addEventListener("click", function(event) {
      if (event.target.textContent === currentQuestion.correctAnswer){
        console.log("Correct Answer!");
      } else {
        console.log("Wrong Answer!");
      }
      nextQuestion(nextQuestionIndex+1);
    });
    possibleAnswersEl.appendChild(li);
  }
}


//Check answer function
function checkAnswer(event) {
  if (event.target.textContent === currentQuestion.correctAnswer){
    console.log("Correct Answer!");
  } else {
    console.log("Wrong Answer!");
  }
  
}