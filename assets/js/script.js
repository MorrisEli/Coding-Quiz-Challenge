//HTML Elements
var timeTag = document.querySelector('#timeTag'); 
var timePTag = document.querySelector('header').children[1];
var submitHighScoreBtn = document.querySelector('#submitHighScoreBtn');
var viewHighScoresBtn = document.querySelector('#viewHighScoresBtn');
var clearHighScoresBtn = document.querySelector('#clearHighScoresBtn');
var answerButtonLst = document.body.querySelector('ul');
var goBackScoreBtn = document.querySelector('#goBackBtn');
var startBtn = document.querySelector('#startBtn');
var titleTag = document.querySelector('#title');
//start test with 75 seconds
//questions and answers
var questionObj = {
    questions: [
        'Inside which HTML element do we put JavaScript?', //1
        'What is the corrext JavaScript syntax to change the content of the HTML element below? <p id="demo">This is a demonstration.</p>',
        'Where is the correct place to innsert a JavaScript?',
        'A very useful tool used during development and debugging for printing content to the debugger is:',//4
        'Commnoly used data types DO not include:',
        'The condition in an if / else statement is enclosed with ______.',
        'Arrays in JavaScript can be used to store',
        'Strign values must be enclosed wihtin _______ when being assigned to variables.',  //8
    ],
    answers: [
        ['<js>', 'correct:<script>', '<javascript>', '<scripting>'],
        [`document.getElement("p").innerHTML = "Hello World!";`, `#demo.innerHTML = "Hello World!";`, `correct:document.getElementById("demo").innerHTML = "Hello World!";`, `document.getElementByName("p").innerHTML = "Hello World!";`],
        [`The <head> section`, `Both the <head> section and the <body> section are correct`, `correct:The <body> section`, `The <footer> section`],

    ]
}


var globalTimerPreset = 75; //start time
//variables
var questionIndexNumber = 0;
var timeLeft = globalTimerPreset;
var score = 0;
var gameEnded = true;

function setUpGame() {
    timeLeft = globalTimerPreset;
    timeTag.textContent = globalTimerPreset;

    document.querySelector('#display-highscore-div').getElementsByClassName.display = 'none';

    titleTag.textContent = 'Coding Quiz Challenge';

    titleTag.styleDisplay = 'block';
    document.querySelector('#instructions').style.display = 'block';
    viewHighScoresBtn.style.display = 'block';
    startBtn.style.display = 'block';

    return;
}

function startGame() {
    gameEnded = 'false';
    questionIndexNumber = 0;

    viewHighScoresBtn.style.display = 'none'
    startBtn.style.display = 'none';
    document.querySelector('#instructions').style.display = 'none';
    timePTag.style.display = 'block';

    showQuestions(questionIndexNumber);
    startTimer();

    return;
}

function startTimer() {
    var timerInterval = setInterval(function() {
        if(gameEnded === true) {
            clearInterval(timerInterval);
            return;
        }
        if(timeLeft < 1) {
            clearInterval(timerInterval);
            return;
    }

    timeTag.textContent = timeLeft;
    timeLeft--;
}, 1000);

return;
}

function showQuestions(currentQuestionIndex) {
    titleTag.textContent = questionObj.questions[currentQuestionIndex];
    createAnswerElements(currentQuestionIndex);

    return;
}

function createAnswerElements(currentQuestionIndex) {
    answerButtonLst.innerHTML = '';

    for (let answerIndex = 0; answerIndex < questionObj.answers[currentQuestionIndex].length; answerIndex++) {
        var currentAnswerListItem = document.createElement('li');
        var tempStr = questionObj.answers[currentQuestionIndex];

        if (questionObj.answers[currentQuestionIndex][answerIndex].includes(`correct:`)){
            tempStr = questionObj.answsers[currentQuestionIndex][answerIndex].string(8, questionObj.answers[currentQuestionIndex][answerIndex].length);
            currentAnswerListItem.id = 'correct';
        }

        return;
    }
}

function nextQuestion() {
    questionIndexNumber++;
    if(questionIndexNumber >= questionObj.questionlength){
        endGame();
    } else {
        showQuestions(questionIndexNumber);
    }

    return;
}

function endGame() {
    gameEnded = true;
    score = timeLeft;

    timePTag.style.display = 'none';
    titleTag.style.display = 'none';
    answerButtonLst.innerHTML = '';

    document.querySelector('#scoreSpan').textContent = score;
    document.querySelector('#submit-highscore-div').style.display = 'block';

    return;
}

function checkAnswer(event) {
    if (event.target != answerButtonLst){
        if (!(event.target.id.includes('correct'))){
    }

    nextQuestion();
    }

    return;
}

function storeScoreAndName() {
    var highscoreTextbox = document.querySelector('input');
    var tempArrayOfObjects = [];

    if(highscoreTextbox.value != `` || highscoreTextbox.value != null) {
        var tempObject = {
            names: highscoreTextbox.value,
            scores: score,
        }

        if(window.localStorage.getItem('highscores') == null) {
            tempArrayOfObjects.push(tempObject);
            window.localStorage.setItem('highscores', JSON.stringify(tempArrayOfObjects));

        
        } else {
            tempArrayOfObjects = JSON.parse(wind.localStorage.getItem('highscores'));

            for (let index = 0; index <= tempArrayOfObjects.length; index++) {
                if (index = tempArrayOfObjects.length) {
                    tempArrayOfObjects.push(tempObject);
                    break;
                }
            }
            window.localStorage.setItem('highscores', JSON.stringify(tempArrayOfObjects))
        } 
        document.querySelector('input').value = '';
        score = 0;

        showHighscores();
    }

    return;
}

function showHighscores() {
    titleTag.style.display = 'none';
    startBtn.style.display = 'none';
    document.querySelector('header').children[0].style.display = 'none';
    document.querySelector('#instructions').style.display = 'none';
    document.querySelector('#submit-highscore-div').style.display = 'none';

    document.querySelector('#display-highscore-div').style.display = 'block';
     
    tempOrderList = document.querySelector('ol');
    tempOrderList.innerHTML = ''

    tempArrayOfObjects = JSON.parse(window.localStorage.getItem('highscores'));
    if (tempArrayOfObjects != null) {
        for (let index = 0; index < tempArrayOfObjects.length; index++) {
            var newLi = document.createElement('li')
            newLi.textContent = tempArrayOfObjects[index].names + '-' + tempArrayOfObjects[index].scores;
            tempOrderList.appendChild(newLi);
        }
    } else {
        var newLi = document.createElement('p')
        newLi.textContent = 'No Highscores'
        tempOrderList.appendChild(newLi);
    }

    return;
}

function clearHighScores() {
    document.querySelector('ol').innerHTML = '';
    window.localStorage.clear();

    setUpGame();

    return;
}

function clearHighScores() {
    document.querySelector('ol').innerHTML = '';
    window.localStorage.clear();

    setUpGame();

    return;
}

function init() {
    startBtn.addEventListener('click', startGame);
    answerButtonLst.addEventListener('click', checkAnswer);
    viewHighScoresBtn.addEventListener('click', showHighscores);
    clearHighScoresBtn.addEventListener('click', clearHighScores);
    goBackScoreBtn.addEventListener('click', setUpGame);

    setUpGame();

    return;
}

init();