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

// Array of questions/answers 
var questions = [{
        question: 'In JS, opens up a yes/no dialog and returns true/false depending on user click.',
        options: {
            a: 'alert()',
            b: 'prompt()',
            c: 'confirm()'
        },
        answer: 'confirm()'
    },
    {
        question: 'Which one below is NOT a JavaScrip Variable',
        options: {
            a: 'const',
            b: 'start',
            c: 'let'
        },
        answer: 'start'
    },
    {
        question: 'In HTML, JavaScript code must be inserted between which tags.',
        options: {
            a: '<script></script>',
            b: '<header></header>',
            c: '<footer></footer>'
        },
        answer: '<script></script>'
    } {
        question: 'In CSS ___ are reusable styles that can be added to HTML elements.',
        options: {
            a: 'classes',
            b: 'IDs',
            c: 'elements'
        },
        answer: 'classes'
    }
]