var startQuizBtn = document.querySelector("#start-quiz");
var possibleAnswersEl = document.querySelector("#choices");
var quizQuestionEl = document.querySelector("#question");
var highScoresEl = document.querySelector("#high-scores-section");
var timerEl = document.querySelector("#timer")
var rightOrWrongEl = document.querySelector("#right-or-wrong")

var TIMER_START_SECOND = 60;

var timer;
var timerInterval;


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
  initTimer();
  nextQuestion(0);
  highScoresEl.setAttribute("style", "display:none;")
  startQuizBtn.setAttribute("style", "display:none;")
}

//Handles timer 
function initTimer(){
  timer=TIMER_START_SECOND;
  timerEl.textContent = timer;
  timerInterval = setInterval(function(){
    if (timer>0){
      timer--;
      timerEl.textContent = timer;
    } else {
      endOfQuiz();
    }
  }, 1000);
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
        timer += 5;
        rightOrWrongEl.textContent = "Correct!"
      } else {
        timer -=5;
        rightOrWrongEl.textContent = "Wrong!"
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
    clearInterval(timerInterval);

}