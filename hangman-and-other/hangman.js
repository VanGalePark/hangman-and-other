let newGame = document.getElementById('newGame')
let hangman = document.getElementById('hangmanHead')

let words = [ 
    ['CHEESE', ['Dairy product.', 'Sometimes had holes in it.']],
    ['VAMPIRE', ['Likes to drink blood.', 'Dracula']],
    ['MOSQUITO', ['Likes to drink blood.', 'Tends to be annoying on camping trips.']],
    ['TRUMPET', ['Brass instrument.', 'Has 3 valves.']]

]

let index = 0
let answer = ''
let funTimeWord = null
let guessed = []
let mistakes = 0
let maxWrong = 7

function randomWord() {
    index = Math.floor(Math.random() * words.length)
    answer = words[index][0]
    console.log(answer)
    //answer gets random word from array words
}

function makeButtons() {
    //makes buttons like a keyboard
    let buttonsHTML = 'QWERTYUIOP'.split('').map(letter =>
        `
        <th>
            <button id='${letter}' onClick='handleGuess("${letter}");disabled=true'>
                ${letter}
            </button>
        </th>    
        `).join('')
    
    document.getElementById('buttonsOne').innerHTML = buttonsHTML;

    let buttonsTwoHTML = 'ASDFGHJKL'.split('').map(letter =>
        `
         <th>
            <button id='${letter}' onClick='handleGuess("${letter}");disabled=true'>
                ${letter}
            </button>
        </th>
        `).join('');
    
    document.getElementById("buttonsTwo").innerHTML = buttonsTwoHTML;
    
    let buttonsThreeHTML = 'ZXCVBNM'.split('').map(letter =>
        `
        <th>
            <button id='${letter}' onClick='handleGuess("${letter}");disabled=true'>
                ${letter}
            </button>
        </th>
        `).join('');
    
    document.getElementById("buttonsThree").innerHTML = buttonsThreeHTML;
    
    document.getElementById('space').innerHTML = `
    <th>
        <button style='padding-right: 50px; padding-left: 50px;' onClick='handleGuess(" ");disabled=true'>Space Bar</button>
    </th>
    `
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null
    

    if(mistakes === maxWrong) {
        mistakes = 7

    } else if(funTimeWord === answer) {
        mistakes = mistakes

    } else if(answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkGameWin();

    } else if(answer.indexOf(chosenLetter) === -1) {
        mistakes = mistakes + 1
        updateMistakes()
        checkGameLose()
        //updateHangingPicture()
    }
    
}

//function updateSpacePicture() {
///    document.getElementById('spacemanImg').src = `../images/abducted${mistakes}.png`;
///}

function checkGameWin() {
    if (funTimeWord === answer) {
        ///document.getElementById('spacemanImg').src = '../images/YouWin.png'
        console.log('u win, v nice')
    }
    
}

function checkGameLose() {
    if (mistakes === maxWrong) {
        document.getElementById('gameWord').innerHTML = `<p>WRONG! The word was: ${answer}</p>`
    }
}

function guessedWord() {
    funTimeWord = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('gameWord').innerHTML = funTimeWord;
    
}

function updateMistakes() {
    document.getElementById('wrong').innerHTML = mistakes;
}

function showHint() {
    document.getElementById('hint').innerHTML = `${words[index][1][Math.floor(Math.random() * 2)]}`
}

function reset() {
    mistakes = 0;
    guessed = [];
    //document.getElementById('spacemanImg').src = '../images/abducted0.png'
    document.getElementById('letters').innerHTML = ''
    document.getElementById('hint').innerHTML = ''

    randomWord();
    guessedWord();
    updateMistakes();
    makeButtons();
}



randomWord();
makeButtons();
guessedWord();