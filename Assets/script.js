var startQuiz = document.querySelector("#startquiz");
var startTimer = document.querySelector("#starttime");

function quiz() {
    update = setInterval("timer()", 1000);
    document.querySelector("#startPage").classList.add("hide");
    document.querySelector("#questionsSection").classList.remove("hide");
}

var time = 90;

function timer() {
    time = time - 1;
    if (time < 90) {
        startTimer.innerHTML = time;
    }
    if (time < 1) {
        window.clearInterval(update);
    }
}
startQuiz.addEventListener("click", quiz);