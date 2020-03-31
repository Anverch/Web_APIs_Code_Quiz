var startQuiz = document.querySelector("#startQuiz");
var startTimer = document.querySelector("#startTime");

var currentQuestionIndex = 0;

function quiz() {
    update = setInterval(timer, 1000);
    document.querySelector("#startPage").classList.add("hide");
    document.querySelector("#questionsSection").classList.remove("hide");

    displayQuestion(questions[currentQuestionIndex], currentQuestionIndex);
}
//Timer 
var time = 90;

/**
 * timer to count down the game time
 */
function timer() {
    time = time - 1;
    if (time < 90) {
        startTimer.innerHTML = time;
    }
    if (time < 1) {
        window.clearInterval(update);
    }
}
//Starts teh Quiz
startQuiz.addEventListener("click", quiz);

// Function for the question section
function displayQuestion(question, index) {

    // Fields that we will change in HTML
    var questionHeader = document.querySelector("#questionHeader");
    var questionDiv = document.querySelector("#question");
    var answersDiv = document.querySelector("#answers");

    // Assigns title for the question
    questionHeader.innerHTML = `Question: ${ index + 1}`;
    questionDiv.innerHTML = question.questionText;

    // Loops the options for the question
    question.options.forEach(option => {
        var element = document.createElement("div");
        var button = document.createElement("button")
        button.innerHTML = option.text;
        button.setAttribute("class", "btn-secondary btn btn-block");
        element.appendChild(button);
        element.setAttribute("class", "row p-1");
        answersDiv.appendChild(element);

        // When clicked, checks for answer
        button.addEventListener("click", checkAnswer);
    });
}

function checkAnswer() {
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < 3) {
        currentQuestionIndex += 1;
        var answersDiv = document.querySelector("#answers");
        answersDiv.innerHTML = ""
        displayQuestion(questions[currentQuestionIndex], currentQuestionIndex);

    } else {
        alert("END");
    }

}


// Array of questions/answers 
var questions = [{
        questionText: 'In JS, what opens up a yes/no dialog and returns true/false depending on user click.',
        options: [
            { text: 'alert()' },
            { text: 'prompt()' },
            { text: 'confirm()' }
        ],
        answer: 'confirm()'
    },
    {
        questionText: 'Which one below is NOT a JavaScrip Variable',
        options: [
            { text: 'const' },
            { text: 'start' },
            { text: 'let' }
        ],
        answer: 'start'
    },
    {
        questionText: 'In HTML, JavaScript code must be inserted between which tags.',
        options: [
            { text: "script" },
            { text: "header" },
            { text: "footer" }
        ],
        answer: "script"
    },
    {
        questionText: 'In CSS ___ are reusable styles that can be added to HTML elements.',
        options: [
            { text: 'classes' },
            { text: 'IDs' },
            { text: 'elements' }
        ],
        answer: 'classes'
    }
]