var startQuizBtn = document.querySelector("#start-quiz");
var possibleAnswersEl = document.querySelector("#choices");
var quizQuestionEl = document.querySelector("#question");
var highScoresEl = document.querySelector("#high-scores-section");


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
  highScoresEl.setAttribute("style", "display:none;")
  startQuizBtn.setAttribute("style", "display:none;")
}


//Gets next question
function nextQuestion(nextQuestionIndex) {
  if (nextQuestionIndex >= questions.length){
    endOfQuiz();
    return;
  }
  var currentQuestion = questions[nextQuestionIndex];
  possibleAnswersEl.innerHTML = "";
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


//End of quiz housekeeping
function endOfQuiz(){
    quizQuestionEl.innerHTML="";
    possibleAnswersEl.innerHTML="";
    highScoresEl.setAttribute("style", "display:block");
    startQuizBtn.setAttribute("style", "display:block");
    startQuizBtn.textContent = "Try Again!";

}