var timeLeft = 0;
var quizEnd = true;
var startEl = document.querySelector("#btn-start");
var cardStartEl = document.querySelector("#card-start");
var cardQuizEl = document.querySelector("#card-quiz");

startEl.addEventListener("click", function() {
    // hide start card and show quiz card
    cardStartEl.setAttribute("class", "card hide-card");
    cardQuizEl.setAttribute("class", "card show-card");
});