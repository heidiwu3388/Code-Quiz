const listEl = document.querySelector("#highscores-list");
const goBackEl = document.querySelector("#go-back");
const clearEl = document.querySelector("#clear");

// get all high scores form local storage
let allHighscores = JSON.parse(localStorage.getItem("highscores") || "[]");

// display each highscore in a dynamically created <li> 
allHighscores.forEach(element => {
    let highscoreEl = document.createElement("div");
    highscoreEl.textContent = element.initials + " - " + element.score;
    listEl.appendChild(highscoreEl);
});

// when GO BACK button is clicked, go back to main page (index.html)
goBackEl.addEventListener("click", function(){
    location.href = "./index.html"
});

// when CLEAR HIGH SCORES button is clicked
clearEl.addEventListener("click", function() {
    // remove "highscore" from local storage
    localStorage.removeItem("highscores");
    // clear display
    listEl.innerHTML="";
});

