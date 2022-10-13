var startQuizBtn = document.querySelector("#start-quiz");
var possibleAnswersEl = document.querySelector("#choices");
var quizQuestionEl = document.querySelector("#question");
var highScoresEl = document.querySelector("#high-scores-section");
var timerEl = document.querySelector("#timer");
var rightOrWrongEl = document.querySelector("#right-or-wrong");
var scoreSubmitBtn = document.querySelector("#score-submit-button");
var highScoresListEl = document.querySelector("#high-scores-list");
var initialsInputEl = document.querySelector("#initials-input");
var highScoresMessageEl = document.querySelector("#high-scores-message");
var initialsInputSectionEl = document.querySelector("#initials-input-section");

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
  question: "The JavaScript tag goes inside of which HTML element?",
  possibleAnswers: [
      "<tag>",
      "<div>",
      "<script>",
      "<javascript>"
  ],
  correctAnswer: "<script>"
  }, 
  {
    question: "Where is the correct place to insert a JavaScript?",
    possibleAnswers: [
        "Body section",
        "Head Section",
        "Both the body and/or the head section",
        "Footer"
    ],
    correctAnswer: "Both the body and/or the head section"
    }, 
    {
      question: "How do you call a function named myFunction?",
      possibleAnswers: [
          "myFunction()",
          "call myFunction",
          "callfunction myFunction",
          "#myFunction"
      ],
      correctAnswer: "myFunction()"
      }, 
      {
        question: "How to write an IF statement in JavaScript?",
        possibleAnswers: [
            "if i = 5",
            "if (i==5)",
            "if i = 5 then",
            "if i == 5"
        ],
        correctAnswer: "if (i==5)"
        }
];


//Quiz
function startQuiz(){
  initTimer();
  nextQuestion(0);
  hideElement(highScoresEl);
  hideElement(startQuizBtn);
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

//Next question
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
        timerEl.textContent = timer;
        rightOrWrongEl.textContent = "Correct!"
      } else {
        timer -=5;
        timerEl.textContent = timer;
        rightOrWrongEl.textContent = "Wrong!"
      }
      nextQuestion(nextQuestionIndex+1);
    });
    possibleAnswersEl.appendChild(li);
  }
}

//End of quiz housekeeping
function endOfQuiz(){
    clearInterval(timerInterval);

    quizQuestionEl.innerHTML="";
    possibleAnswersEl.innerHTML="";
    startQuizBtn.textContent = "Try Again!";
    
    hideElement(highScoresListEl);
    showElement(initialsInputSectionEl);
    showElement(highScoresEl);
    showElement(startQuizBtn);
  }

//Submits score
function submitScore(){
    var userInitials = initialsInputEl.value;
    if (userInitials.length !== 2){
      highScoresMessageEl.textContent = "Your must input 2 letters for your initials!"
      return;
    }
    var highScores = localStorage.getItem("highScores");

    if (highScores === null){
      highScores = [];
    } else {
      highScores = JSON.parse(highScores);
    }

    highScores.push({
      initials: userInitials,
      score: timer
    });

    highScores = highScores.sort(function(a,b){
      return b.score - a.score
    })

    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayHighScores(highScores);
    initialsInputEl.value = "";
    hideElement(initialsInputSectionEl);
  }

//Displays highscores 
function displayHighScores(highScores){
    highScoresListEl.innerHTML=" ";
    for (var i= 0; i < highScores.length; i++){
      var currentScore = highScores[i];
      var li = document.createElement("li");
      li.textContent = `${currentScore.initials}: ${currentScore.score}`
      highScoresEl.appendChild(li);
    }
    showElement(highScoresListEl);
}

function showElement(element){
  element.setAttribute("style","display:block;")
}

function hideElement(element){
  element.setAttribute("style","display:none;")
}

//Button starts quiz
startQuizBtn.addEventListener("click", startQuiz);

//Submit score button functionality
scoreSubmitBtn.addEventListener("click", submitScore);