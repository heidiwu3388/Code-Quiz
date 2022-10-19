var timeLeft = 0;
var quizEnd = true;
var intervalId;
var startEl = document.querySelector("#btn-start");
var cardStartEl = document.querySelector("#card-start");
var cardQuizEl = document.querySelector("#card-quiz");
var timeEl = document.querySelector("#time");

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
    // present the question one by one
    
});