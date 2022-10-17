const showVerb = document.getElementById('showVerb');
const showImage = document.getElementById('showImage');
const showAudio = document.getElementById('showAudio');

const first = document.getElementById('first-verb');
const second = document.getElementById('second-verb');
const third = document.getElementById('third-verb');
const fourth = document.getElementById('fourth-verb');

const next = document.getElementById('next');
const verbsCounter = document.getElementById('verbs-counter');
const verbsPromedio = document.getElementById('verbs-promedio');
const allRightCounter = document.getElementById('all-right-answers');
const verbsContainer = document.getElementById('verbs-container');

const numberOfVerbs = verbs.length;

let answerRoullete = [0, 1, 1, 1];
let everyNumberOfVerbs = [];
let rightAnswer;
let rightAnswersCounter = 0;
let promedio=0;

next.addEventListener("click", function () {
    ponerVerbo();
    next.style.display = 'none';
});

makeRandomList();
let lastPosition = everyNumberOfVerbs.length - 1;

function makeRandomList() {
    for (var i = 0; i < numberOfVerbs; i++) {
        everyNumberOfVerbs.push(i);
    }
    everyNumberOfVerbs = everyNumberOfVerbs.sort(() => Math.random() - 0.5);
}


function buttonEffect(itsRight, button) {
    if (itsRight) {
        button.classList.add('rightAnswer');
        setTimeout(function () {
            button.classList.remove('rightAnswer');
        }, 1000);
        rightAnswersCounter = rightAnswersCounter + 1;
        
    } else {
        button.classList.add('wrongAnswer');
        setTimeout(function () {
            button.classList.remove('wrongAnswer');
        }, 1000);
    }
    setTimeout(function () {
        ponerVerbo();
    }, 500);
}

first.addEventListener("click", function () {
    buttonEffect(isItRight_(first.innerHTML), this);
});

second.addEventListener("click", function () {
    buttonEffect(isItRight_(second.innerHTML), this);
});

third.addEventListener("click", function () {
    buttonEffect(isItRight_(third.innerHTML), this);
});

fourth.addEventListener("click", function () {
    buttonEffect(isItRight_(fourth.innerHTML), this);
});


function shuffleAnswers(array) {
    let numberOfAnswerButtons = array.length;
    let randomIndex;

    while (numberOfAnswerButtons != 0) {
        randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
        numberOfAnswerButtons--;

        [array[numberOfAnswerButtons], array[randomIndex]] = [
            array[randomIndex], array[numberOfAnswerButtons]];
    }

    return array;
}


let isItRight_ = (answer) =>{
    return answer == rightAnswer ? true : false;
}

let randomVerbo = (notThisOne) =>{
    theOne = Math.floor(Math.random() * verbos.length);
    return theOne == notThisOne ? randomVerbo(notThisOne) : theOne;
}

let ponerVerbo = () => {

    answerRoullete = shuffleAnswers(answerRoullete);

    let randomPosition = everyNumberOfVerbs[lastPosition];
    let imgText = "<img src='img/" + verbs[randomPosition] + ".jpg' height:'140px' width='100px'>";

    first.classList.add("btn", "btn-outline-primary", "btn-md");
    second.classList.add("btn", "btn-outline-primary", "btn-md");
    third.classList.add("btn", "btn-outline-primary", "btn-md");
    fourth.classList.add("btn", "btn-outline-primary", "btn-md");

    if (lastPosition >= 0) {
        var just_position = lastPosition + 1;
        verbsCounter.innerHTML = "" + just_position + " / " + numberOfVerbs;
        allRightCounter.innerHTML = "Right answers: " + rightAnswersCounter;
        showVerb.innerHTML = verbs[randomPosition];
        showImage.innerHTML = imgText;

        showAudio.src = "audio/" + verbs[randomPosition] + ".mp3";
        showAudio.play();

        first.innerHTML = !answerRoullete[0] ? verbos[randomPosition] : verbos[randomVerbo(randomPosition)];
        second.innerHTML = !answerRoullete[1] ? verbos[randomPosition] : verbos[randomVerbo(randomPosition)];
        third.innerHTML = !answerRoullete[2] ? verbos[randomPosition] : verbos[randomVerbo(randomPosition)];
        fourth.innerHTML = !answerRoullete[3] ? verbos[randomPosition] : verbos[randomVerbo(randomPosition)];

        rightAnswer = verbos[randomPosition];
        lastPosition = lastPosition - 1;
    } else {
        promedio=(rightAnswersCounter/numberOfVerbs)*10;
        verbsCounter.innerHTML = "0 / " + numberOfVerbs;
        allRightCounter.innerHTML = "Right answers: " + rightAnswersCounter;
        verbsPromedio.innerHTML= "Score: " + promedio;
        showVerb.innerHTML = "Thank you !";
        verbsContainer.innerHTML = "";
    }
}