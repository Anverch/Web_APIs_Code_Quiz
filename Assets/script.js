var closeModalBtn = null;
var time = 90;
var currentQuestionIndex = 0;
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
];

var highScoreBtn = document.querySelector("#highScoreBtn");
var startQuizBtn = document.querySelector("#startQuiz");
var startTimer = document.querySelector("#startTime");

startQuizBtn.addEventListener("click", startQuiz);
highScoreBtn.addEventListener("click", showHighScoresModal);

// Sets initial time
startTimer.innerHTML = time;


// function for highscores
function showHighScoresModal() {
    document.querySelector("#highScoreModal").classList.remove("hide");
    closeModalBtn = document.querySelector("#closeModal");
    closeModalBtn.addEventListener("click", hideHighScoresModal);
    var listOfHighScores = document.querySelector("#listOfHighScores");
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    for (var i = 0; i < highScores.length; i++) {
        listOfHighScores.innerHTML = listOfHighScores.innerHTML + highScores[i].userInitial + " " + highScores[i].endTime + "<br>";

    }
}

// Hides high score modal
function hideHighScoresModal() {
    document.querySelector("#highScoreModal").classList.add("hide");
}

function startQuiz() {
    update = setInterval(updateTime, 1000);
    document.querySelector("#startQuizSection").classList.add("hide");
    document.querySelector("#questionsSection").classList.remove("hide");

    displayQuestionAndAnswers(questions[currentQuestionIndex], currentQuestionIndex);
}

/**
 * Timer to count down the game time
 */
function updateTime() {
    time = time - 1;
    if (time < 90) {
        startTimer.innerHTML = time;
    }
    if (time === 0) {
        showFinalScoreSection();
        window.clearInterval(update);
    }
}

// Function for the question section
function displayQuestionAndAnswers(question, index) {

    // Fields that we will change in HTML
    var questionHeader = document.querySelector("#questionHeader");
    var questionDiv = document.querySelector("#question");
    var answersDiv = document.querySelector("#answers");

    // Assigns title for the question
    questionHeader.innerHTML = "Question: " + (index + 1);
    questionDiv.innerHTML = question.questionText;

    // Loops the options for the question
    question.options.forEach(option => {
        var element = document.createElement("div");
        var button = document.createElement("button");
        button.innerHTML = option.text;
        button.setAttribute("class", "btn-secondary btn btn-block");
        element.appendChild(button);
        element.setAttribute("class", "row p-1");
        answersDiv.appendChild(element);

        // When clicked, checks for answer
        button.addEventListener("click", function() {
            checkAnswer(button, question.answer);
        });
    });

}

// Comparing user input to the correct answer 
function checkAnswer(button, correctAnswer) {
    var userAnswer = button.innerHTML;
    if (userAnswer === correctAnswer) {
        button.setAttribute("class", "btn-secondary btn btn-block bg-success");
    } else {
        button.setAttribute("class", "btn-secondary btn btn-block bg-danger");
        time = time - 15;
    }
    setTimeout(function() { displayNextQuestion(); }, 500);
}

function displayNextQuestion() {
    if (currentQuestionIndex < 3) {
        currentQuestionIndex += 1;
        var answersDiv = document.querySelector("#answers");
        answersDiv.innerHTML = ""
        displayQuestionAndAnswers(questions[currentQuestionIndex], currentQuestionIndex);
    } else {
        showFinalScoreSection();
    }
}

function showFinalScoreSection() {
    document.querySelector("#startQuizSection").classList.add("hide");
    document.querySelector("#questionsSection").classList.add("hide");
    document.querySelector("#saveScoreSection").classList.remove("hide");
    var endTime = time;
    var finalScore = document.querySelector("#finalScore");

    finalScore.innerHTML = endTime;
    window.clearInterval(update);
    var submitScoreBtn = document.querySelector("#submitScore");

    var userInitialsInput = document.querySelector("#userInitials");
    submitScoreBtn.addEventListener("click", function() {
        submitFinalScore(userInitialsInput.value, endTime);
    });
}

function submitFinalScore(userInitial, endTime) {
    var highScore = {
        userInitial: userInitial,
        endTime: endTime
    };
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(highScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}