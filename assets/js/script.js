let timeLeft = 0;
let intervalId;
let currentQuestion = 0; //index of the current question
const startEl = document.querySelector("#btn-start");
const cardStartEl = document.querySelector("#card-start");
const cardQuizEl = document.querySelector("#card-quiz");
const cardEndEl = document.querySelector("#card-end");
const timeEl = document.querySelector("#time");
const questionEl = document.querySelector("#question");
const choicesEl = document.querySelector("#choices");
const messageEl = document.querySelector("#message");
const scoreEl = document.querySelector("#score");
const formInitialsEl = document.querySelector("#form-initials");
const inputInitialsEl = document.querySelector("#initials");
const quiz = [
    {
        question: "Q1. Inside which HTML element do we put the JavaScript?", 
        choices: ["<script>",
                "<scripting>",
                "<js>",
                "<javascript>"],
        answerindex: 0
    },
    {
        question: "Q2. How to write an IF statement in JavaScript?", 
        choices: ["if i == 5 then",
                "if i = 5",
                "if ( i == 5 )",
                "if i = 5 then"],
        answerindex: 2
    },
    {
        question: "Q3. Which is the correct way to write a JavaScript array", 
        choices: ["var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
                "var colors = 'red', 'green', 'blue'",
                "var colors = (1:'red', 2:'green', 3:'blue')",
                "var colors = ['red', 'green', 'blue']"],
        answerindex: 3
    },
    {
        question: "Q4. Who is making the Web standards?", 
        choices: ["The World Wide Web COnsortium",
                "Microsoft",
                "Google",
                "Mozilla"],
        answerindex: 0
    },
    {
        question: "Q5. How can you open a link in a new tab/browser window?", 
        choices: ["<href='url' target='_bland'>",
                "<href='url' target='new'>",
                "<href='url' new>",
                "<href='url' _blank'>"],
        answerindex: 0
    },
    {
        question: "Q6. In HTML, which attribute is used to specify that an input field must be filled out?", 
        choices: ["required",
                "placeholder",
                "validate",
                "formvalidate"],
        answerindex: 0
    }
];

function renderQuestion() {
    // render question
    questionEl.textContent = quiz[currentQuestion].question;
    // render the 4 choices and set up the attribute data-answer
    for (i=0; i<4; i++) {
        choicesEl.children[i].textContent = quiz[currentQuestion].choices[i];
        choicesEl.children[i].setAttribute("data-correct", i===quiz[currentQuestion].answerindex);
    }
    // let message stay for 0.5 second before clearing it
    setTimeout(()=>messageEl.textContent="",500);
};

function renderQuizEnd() {
    clearInterval(intervalId); // stop count down timer
    let score = timeLeft>0 ? timeLeft : 0; // calculate score (timeLeft may be negative when 15s is deducted)
    
    // hide QUIZ page and show END page
    cardQuizEl.style.display = "none";
    cardEndEl.style.display = "block";

    // display score
    scoreEl.textContent = score;

};

function lastQuestion() {
    return (currentQuestion >= quiz.length-1);
};

// when Start button is clicked
startEl.addEventListener("click", function() {
    // hide start card and show quiz card
    cardStartEl.style.display = "none";
    cardQuizEl.style.display = "block";
    //start timer
    timeLeft = 75;
    timeEl.textContent = timeLeft;
    intervalId = setInterval(function(){
        //count down and show time
        timeLeft--;
        timeEl.textContent = timeLeft;
        //stop timer and go to END page when count down to 0
        if (timeLeft<=0){
            clearInterval(intervalId);
            renderQuizEnd();
        }
    },1000);
    // render the question one by one
    renderQuestion();
});

// when one of the choices is clicked
choicesEl.addEventListener("click", function(event) {
    // check if the choice is correct
    if (event.target.dataset.correct === "true") { 
        messageEl.textContent = "Correct ✅"; 
    } else { // wrong choice
        messageEl.textContent = "Wrong ❌"; 
        timeLeft -= 15; // deduct 15 seconds from the score
        timeEl.textContent = timeLeft; // show the new time
    };
    
    // quiz end if it is last question or time is out
    if (lastQuestion() || timeLeft <= 0) {
        renderQuizEnd();
    } else { // otherwise, show next question
        currentQuestion++;
        renderQuestion();
    };
});

// when submit button is clicked for the initials input
formInitialsEl.addEventListener("submit", function(event) {
    event.preventDefault();
    let myInitials = inputInitialsEl.value.trim().toUpperCase();
    let myScore = scoreEl.textContent;

    // get highscores from localStorage
    let allHighScores = JSON.parse(localStorage.getItem("highscores") || "[]");
    
    // check my previous highscore, replace if this quiz get higher score,
    let found = false;
    allHighScores.forEach(highscore => {
        if (highscore.initials === myInitials) {
            found = true;
            if (myScore > highscore.score) {
                highscore.score = myScore
            };
        }
    }); 
    
    // if previous highscore not found, add this quiz's score to 
    if (!found) {
        // create myHighScore object for this quiz
        const myHighScore = {
            initials: myInitials,
            score: myScore
        }
        // add my high score to the end of the array
        allHighScores.push(myHighScore);
    };
    // sort the score in descending order, and keep top 10 only
    allHighScores.sort((a, b) => {return (b.score - a.score);}).splice(10);
    
    // store the allHighScores array in local storage
    localStorage.setItem("highscores", JSON.stringify(allHighScores));

    // go to HIGHSCORE page
    location.href = "./highscores.html"

});