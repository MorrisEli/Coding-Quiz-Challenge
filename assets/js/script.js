var timerTag = document.querySelector(`#timerTag`); 
var timerPTag  = document.querySelector(`header`).children[1]; 
var submitHighscoreBtn = document.querySelector(`#submitHighscoreBtn`); 
var viewHighscoresBtn = document.querySelector(`#viewHighscoresBtn`); 
var clearHighscoreBtn = document.querySelector(`#clearHighscoreBtn`); 
var answerButtonLst = document.body.querySelector(`ul`); 
var goBackHighscoreBtn = document.querySelector(`#goBackBtn`);
var startBtn = document.querySelector(`#startBtn`);
var titleTag = document.querySelector(`#title`) 

var questionObj = { 
    questions: [ 
    `Inside which HTML element do we put JavaScript?`, //1
    `What is the corrext JavaScript syntax to change the content of the HTML element below? <p id="demo">This is a demonstration.</p>`, //2
    `Where is the correct place to innsert a JavaScript?`, //3
    `A very useful tool used during development and debugging for printing content to the debugger is:`,//4
    `Commnoly used data types DO not include:`, //5
    `The condition in an if / else statement is enclosed with ______.`, //6
    `Arrays in JavaScript can be used to store`, //7
    `String values must be enclosed wihtin '' when being assigned to variables`,  //8
],

//Having trouble showing answers.
//Typo with ' vs. `
//make sure the correct: doesnt have space between answers
answers: [
    [`<js>`, `correct:<script>`, `<javascript>`, `<scripting>`], //1
    [`document.getElement("p").innerHTML = "Hello World!";`, `#demo.innerHTML = "Hello World!";`, `correct:document.getElementById("demo").innerHTML = "Hello World!";`, `document.getElementByName("p").innerHTML = "Hello World!";`],//2
    [`The <head> section`, `correct:Both the <head> section and the <body> section are correct`, `The <body> section`, `The <footer> section`],//3
    [`JavaScript`, `terminal/bash`, `for loops`, `correct:console.log`],//4
    [`strings`, `correct:alerts`, `numbers`, `booleans`],//5
    [`commas`, `curly brackets`, `quotes`, `correct: parenthesis`],//6
    [`booleans`, `correct:other arrays`, `numbers and strings`, `all of the above`], //7
    [`commas`, `curly brackets`, `correct:quotes`, `parenthesis`]//8
]
}

var globalTimerPreset = 75; // start time


var questionIndexNumber = 0; 
var timeLeft = globalTimerPreset; 
var score = 0; 
var gameEnded = true; 


function setUpGame() {
    timeLeft = globalTimerPreset; 
    timerTag.textContent = globalTimerPreset; 
    
    document.querySelector(`#display-highscore-div`).style.display = `none`; 

    
    titleTag.textContent = `Coding Quiz Challenge`; 

    
    titleTag.style.display = `block`; 
    document.querySelector(`#instructions`).style.display = `block`; 
    viewHighscoresBtn.style.display = `block`; 
    startBtn.style.display = `block`; 

    return;
}


function startGame() {
    gameEnded = false; 
    questionIndexNumber = 0; 

    
    viewHighscoresBtn.style.display = `none` 
    startBtn.style.display = `none`; 
    document.querySelector(`#instructions`).style.display = `none`; 
    timerPTag.style.display = `block`; 

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
            endGame(); 
        }

        timerTag.textContent = timeLeft; 
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

    for (let answerIndex = 0; answerIndex < questionObj.answers[currentQuestionIndex].length; answerIndex++) { //loop over every answer (for current question) and create a list item on the page based on that content
        var currentAnswerListItem = document.createElement(`li`); 
        var tempStr = questionObj.answers[currentQuestionIndex][answerIndex]; //temp incase the string contains the `correct` answer tag and needs to be pulled out.

        if (questionObj.answers[currentQuestionIndex][answerIndex].includes(`correct:`)){
            tempStr = questionObj.answers[currentQuestionIndex][answerIndex].substring(8, questionObj.answers[currentQuestionIndex][answerIndex].length); //yoink out the string part that doesnt contain `correct:`
            currentAnswerListItem.id = `correct`; 
        }

        currentAnswerListItem.textContent = tempStr; 
        answerButtonLst.appendChild(currentAnswerListItem); 
    }

    return;
}


function nextQuestion() {
    questionIndexNumber++; 
    if (questionIndexNumber >= questionObj.questions.length){ 
        endGame(); 
    } else { 
        showQuestions(questionIndexNumber); 
    } 

    return;
}

function endGame() { 
    gameEnded = true; 
    score = timeLeft; 

    timerPTag.style.display = `none`; 
    titleTag.style.display = `none`; 
    answerButtonLst.innerHTML = ''; 

    document.querySelector(`#scoreSpan`).textContent = score;
    document.querySelector(`#submit-highscore-div`).style.display = `block`; 

    return;
}


function checkAnswer(event) {
    if (event.target != answerButtonLst){ 
        if (!(event.target.id.includes('correct'))){
            timeLeft -= 10; 
        }

        nextQuestion();
    }

    return;
}

function storeScoreAndName() {
    var highscoreTextbox = document.querySelector(`input`); 
    var tempArrayOfObjects = []; 

    if (highscoreTextbox.value != `` || highscoreTextbox.value != null) { 
        var tempObject = {
            names: highscoreTextbox.value, 
            scores: score, 
        }

        if(window.localStorage.getItem(`highscores`) == null) { 
            tempArrayOfObjects.push(tempObject); 
            window.localStorage.setItem(`highscores`, JSON.stringify(tempArrayOfObjects)); 

        } else {
            tempArrayOfObjects = JSON.parse(window.localStorage.getItem(`highscores`)); 

            for (let index = 0; index <= tempArrayOfObjects.length; index++) { 
                if (index == tempArrayOfObjects.length) { 
                    tempArrayOfObjects.push(tempObject) 
                    break; 
                } else if (tempArrayOfObjects[index].scores < score) { 
                    tempArrayOfObjects.splice(index, 0, tempObject); 
                    break; 
                }
            }
            window.localStorage.setItem(`highscores`, JSON.stringify(tempArrayOfObjects)) 
        }
        document.querySelector(`input`).value = ``; 
        score = 0;

        showHighscores(); 
    }

    return;
}

function showHighscores() {
    titleTag.style.display = `none`;
    startBtn.style.display = `none`; 
    document.querySelector(`header`).children[0].style.display = `none`; 
    document.querySelector(`#instructions`).style.display = `none`; 
    document.querySelector(`#submit-highscore-div`).style.display = `none`; 

    document.querySelector(`#display-highscore-div`).style.display = `block`;

    tempOrderedList = document.querySelector(`ol`); 
    tempOrderedList.innerHTML = `` 

    tempArrayOfObjects = JSON.parse(window.localStorage.getItem(`highscores`));
    if (tempArrayOfObjects != null) { 
        for (let index = 0; index < tempArrayOfObjects.length; index++) {
            var newLi = document.createElement(`li`) 
            newLi.textContent = tempArrayOfObjects[index].names + ` - ` + tempArrayOfObjects[index].scores; 
            tempOrderedList.appendChild(newLi); 
        }

    } else { 
        var newLi = document.createElement(`p`) 
        newLi.textContent = `No Highscores` 
        tempOrderedList.appendChild(newLi); 
    }

    return;
}

function clearHighscores() {
    document.querySelector(`ol`).innerHTML = ``; 
    window.localStorage.clear(); 

    setUpGame(); 

    return;
}

function init() {
    startBtn.addEventListener(`click`, startGame); 
    answerButtonLst.addEventListener(`click`, checkAnswer); 
    viewHighscoresBtn.addEventListener(`click`, showHighscores); 
    submitHighscoreBtn.addEventListener(`click`, storeScoreAndName); 
    clearHighscoreBtn.addEventListener(`click`, clearHighscores); 
    goBackHighscoreBtn.addEventListener(`click`, setUpGame); 

    setUpGame(); 

    return;
}

init(); 