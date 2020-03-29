var startQuiz = document.querySelector(".btn");
var startTimer = document.querySelector("#starttime")

function quiz() {
    update = setInterval("timer()", 1000);
}

var time = 90;

function timer() {
    time = time - 1;
    if (time < 90) {
        startTimer.innerHTML = time;
    }
    if (time < 0) {
        window.clearInterval(update);
    }
}
startQuiz.addEventListener("click", quiz);