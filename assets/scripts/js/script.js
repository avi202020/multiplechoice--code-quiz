// Add all variables (selectors) to link to the HTML
var timeEl = document.querySelector("#time");
var screenEl = document.querySelector("#start-screen");
var startBtnEl = document.querySelector("#start");
var questionsEl = document.getElementById("questions");
var answerButtonEl = document.getElementById("answer-Button")
var choiceEl = document.querySelector("#choices");
var endScreenEl = document.querySelector("#end-screen");
var nameEl = document.querySelector("#name");
var submitBtn = document.getElementById("submit");
var feedbackEl = document.querySelector("#feedback");
var finalScoreEl = document.getElementById("#final-score");
var userEl = document.getElementById("initials");
var reStartBtn = document.querySelector("#restart");
let startScreenSect = document.querySelector(".start")
let score = 0;
finalScoreEl = score;

// Play sound on answer
function correctSound() {
  var audio = document.getElementById("correctSound");
  audio.play();
}
function incorrectSound() {
  var audio = document.getElementById("incorrectSound");
  audio.play();
}

function startQuiz(){
startScreenSect.setAttribute('class', 'hide')
questionsEl.removeAttribute('class')

timerId = setInterval(setTime, 1000)
getQuestion()
}

//Add an event listener to the Start Button 

startBtnEl.addEventListener("click", startQuiz,)


//Start Screen display is set too none  
var timerId;
let time = 100    


// setting timer and clear timer
function setTime(){
        time--;
        timeEl.textContent = time
        if (time==0){
            endTheQuiz() 
        }
}

// console.log(score)
let currentQuestion = {}
let buttonsDiv;
let currentQuestionIndex = 0;

// Get Question From mainQuestions Arrays

function getQuestion(){
let currentQuestion = questions[currentQuestionIndex]

let titleElement = document.getElementById('question-title')
titleElement.textContent = currentQuestion.title

choiceEl.innerHTML = "";

for (let index = 0; index < currentQuestion.choices.length; index++) {
    const element = currentQuestion.choices[index];
    let btn = document.createElement('button')

    btn.setAttribute('value', element)
    btn.textContent = index + 1 + ': ' + element;
    choices.onclick = questionClicked
    choiceEl.appendChild(btn)
}


function questionClicked(event) {
    let btn = event.target
   
    
// console.log(event.target.value)

if (event.target.value !== questions[currentQuestionIndex].answer) {
    incorrectSound();   
    feedbackEl.textContent = 'Wrong Answer 10 Secs Deducted!'
    feedbackEl.setAttribute('class', 'feedback text-danger')
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
          }, 2000);    
    time -= 10


}
else {
    correctSound();
    feedbackEl.textContent = 'Correct Answer!'
    feedbackEl.setAttribute('class', 'feedback text-success')
    setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
      }, 2000);   
      score++;  

}
 currentQuestionIndex++

 function displayFinalScore(){
   document.getElementById("final-score").textcontent = score;
  
  }

if (time <= 0 || currentQuestionIndex === questions.length) {
    endTheQuiz()
    } else {
    getQuestion()
    }
    console.log(score)
}
}

// Function to end the quiz//

function endTheQuiz(){
       clearInterval(timerId)
       questionsEl.classList.add("hide") 
       document.getElementById("final-score").textContent = score 
submitBtn
       endScreenEl.removeAttribute("class")
}

   // Saving Name and Score//
function saveInitials(){
    console.log("saveInitials")
let name = userEl.value.trim();
if (name !== ""){
    let scores = JSON.parse(localStorage.getItem("User-Name-Score")) || [];
    let userNamescore = {
        score: score,
        Initials: name
        };
scores.push(userNamescore);
localStorage.setItem("User-Name-Score", JSON.stringify(scores));
window.location.href="highscores.html";
} 
}
submitBtn.addEventListener("click", saveInitials)
