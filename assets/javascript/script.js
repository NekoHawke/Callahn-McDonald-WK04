const container = document.querySelector("div.center-content");
const startSection = container.querySelector("section.quiz-start");
const startButton = startSection.querySelector("button");

const questionSection = container.querySelector("section.quiz-question")
const questionElement = questionSection.querySelector(".question");
const statusElement = questionSection.querySelector("footer .status");
const timerElement = questionSection.querySelector("footer .timer_sec");
const optionsElement = questionSection.querySelector("ul.options");

const resultsSection = container.querySelector("section.quiz-results");
const restartButton = resultsSection.querySelector("button");
const scoreElement = resultsSection.querySelector(".quiz-score");

const questionsCount = questions.length;
const timeForQuestions = 15;
let score = 0;

// Util/Helper methods
const showElement = (element) => {
    element.classList.add("show-content");
};

const hideElement = (element) => {
    element.classList.remove("show-content");
};

const startTimer = (index) => {
    let quizTimer = setInterval(() => {
        const timeLeft = parseInt(timerElement.innerHTML, 10);
        if (timeLeft > 0) {
            timerElement.innerHTML = timeLeft - 1;
        } else {
            clearInterval(quizTimer);
            renderQuestion(index + 1);
        }
    }, 1000);
};

const renderResults = () => {
    scoreElement.innerHTML = score;
    hideElement(questionSection);
    showElement(resultsSection);
};

const renderOptions = (index) => {
    const currentQuestion = questions[index];

    optionsElement.innerHTML = currentQuestion.options
        .map((option) => {
            return `
                <li>
                    <a href="">${option}</a>
                </li>
            `;
        })
        .join('');

    const optionsListItem = optionsElement.querySelectorAll('li');

    // Bind event for each option
    for (let i = 0; i < optionsListItem.length; i++) {
        const option = optionsListItem[i];

        option.addEventListener("click", (e) => {
            e.preventDefault();
            const isCorrectAnswer = i === currentQuestion.answerIndex;

            if (isCorrectAnswer) {
                score++;
            }

            // Are we done or is there another question
            index < questionsCount - 1
                ? renderQuestion(index + 1)
                : renderResults();
        });
    }
};

const renderQuestion = (index) => {
    questionElement.innerHTML =  questions[index].question;
    statusElement.innerHTML = `Question ${index + 1} of ${questionsCount}`;
    timerElement.innerHTML = timeForQuestions;
    renderOptions(index);
    startTimer(index);
}

// Add event handler to start quiz button
startButton.addEventListener("click", () => {
    hideElement(startSection);
    showElement(questionSection);
    renderQuestion(0);
});

// Add event handler to restart quiz button
restartButton.addEventListener("click", () => {
    hideElement(resultsSection);
    showElement(startSection);
    score = 0;
});
