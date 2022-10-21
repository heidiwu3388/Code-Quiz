let timeLeft = 0;
let quizEnd = true;
let intervalId;
let currentQuestion = 0; //index of the current question
const startEl = document.querySelector("#btn-start");
const cardStartEl = document.querySelector("#card-start");
const cardQuizEl = document.querySelector("#card-quiz");
const timeEl = document.querySelector("#time");
const questionEl = document.querySelector("#question");
const choicesEl = document.querySelector("#choices");
const messageEl = document.querySelector("#message");

const quiz = [
    {
        question: "Inside which HTML element do we put the JavaScript?", 
        choices: ["<script>",
                "<scripting>",
                "<js>",
                "<javascript>"],
        answerindex: 0
    },
    {
        question: "How to write an IF statement in JavaScript?", 
        choices: ["if i == 5 then",
                "if i = 5",
                "if ( i == 5 )",
                "if i = 5 then"],
        answerindex: 2
    },
    {
        question: "Which is the correct way to write a JavaScript array", 
        choices: ["var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
                "var colors = 'red', 'green', 'blue'",
                "var colors = (1:'red', 2:'green', 3:'blue')",
                "var colors = ['red', 'green', 'blue']"],
        answerindex: 3
    },
    {
        question: "Who is making the Web standards?", 
        choices: ["The World Wide Web COnsortium",
                "Microsoft",
                "Google",
                "Mozilla"],
        answerindex: 0
    },
    {
        question: "How can you open a link in a new tab/browser window?", 
        choices: ["&la href='url' target='_bland'>",
                "&la href='url' target='new'>",
                "&la href='url' new>",
                "&la href='url' _blank'>"],
        answerindex: 0
    },
    {
        question: "In HTML, which attribute is used to specify that an input field must be filled out?", 
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
    // clear message area
    messageEl.textContent = "";
};

function lastQuestion() {
    console.log("currect question: ", currentQuestion, "total question: ", quiz.length-1);
    return (currentQuestion >= quiz.length-1);
};

// when Start button is clicked
startEl.addEventListener("click", function() {
    // hide start card and show quiz card
    cardStartEl.setAttribute("class", "card hide-card");
    cardQuizEl.setAttribute("class", "card show-card");
    //start timer
    timeLeft = 75;
    timeEl.textContent = timeLeft;
    intervalId = setInterval(function(){
        //count down and show time
        timeLeft--;
        timeEl.textContent = timeLeft;
        //stop timer when count down to 0
        if (timeLeft<=0){
            clearInterval(intervalId);
            quizEnd = true;
        }
    },1000);
    // render the question one by one
    renderQuestion();
});

choicesEl.addEventListener("click", function(event) {
    
    // check if the choice is correct
    if (event.target.dataset.correct === "true") { 
        messageEl.textContent = "Correct✅"; 
    } else { // wrong choice
        messageEl.textContent = "Wrong❌"; 
        timeLeft -= 15; // deduct 15 seconds from the score
    };
    // delay 0.5 second for message display
    setTimeout( function() {
        // quiz end if it is last question or time is out
        if (lastQuestion() || timeLeft <= 0) {
            quizEnd = true;
            console.log("quiz end");
            // stop count down timer
            // calculate score
            // render "end-card" ???
        } else {
            currentQuestion++;
            renderQuestion();
        };
    },500);
});