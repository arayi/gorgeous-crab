
// 1. Main game loop and helper functions
// 2. Interaction with locally stored settings
// 3. Functions to interact with the DOM
// 4. Functions to generate and interact with words
// 5. Functions for animation
// 6. Dictionaries


// 1. Main game loop and helper functions

function runGame () {
  var settings = [pickLanguage(), pickDifficulty()];
  var score = 0;
  var currentWord = generateWord(settings).toUpperCase().split('');

  localStorage.clear();
  
  writeLettersToDOM(currentWord);
  shuffleLetters();
  resetHeader();

  saveSettings('currentWord', currentWord);
  saveSettings('localSettings', settings);
  saveSettings('currentGameScore', score);

  var mainGameInterval = setInterval(function() {
    if (checkForWin() === true) {
      clearInterval(mainGameInterval);
      winGame();
    }
  }, 1000);

};

function checkForWin () {
  if (getScore() >= 3) {
    return true;
  } else {
    return false;
  }
}


function winGame () {
  var modal = document.getElementById('win-modal');
  modal.show();
  document.getElementById('dismiss').onclick = function() {
    modal.close();
  };
  document.getElementById('play-again').onclick = function() {
    modal.close();
    runGame();
  }
};


// 2. Interaction with locally stored settings

function saveSettings (name, settings) {
  var name = name.toString();
  var settings = settings.toString();

  if (typeof(name) === 'string' && typeof(settings) === 'string') {
    localStorage.setItem(name, settings);
  } else {
    console.log('error saving state of: ' + name + ': ' + settings);
  };
};

function getSettings (name) {
  if (name === 'localSettings') {
    return localStorage.getItem(name).split(',')
  } else if (name === 'currentGameScore') {
    return (parseInt(localStorage.getItem(name)));
  } else if (name === 'currentWord') {
    return localStorage.getItem(name);
  } else {
    console.log('error getting setting: ' + name);
  };
};

function getScore () {
  return parseInt(getSettings('currentGameScore'));
}

function incrementScore () {
  var newScore = getScore();
  newScore++;
  saveSettings('currentGameScore', newScore);
}


// 3. Functions to interact with the DOM

function pickLanguage() {
  var languages = document.getElementsByName('language');
  for (var i = 0; i < languages.length; i++) {
    if (languages[i].checked) {
      if (languages[i].value === 'english') {
        return 'english';
      } else if (languages[i].value === 'french') {
        return 'french';
      } else if (languages[i].value === 'spanish') {
        return 'spanish';
      } else {
        console.log('error in pickLanguage');
      }
    };
  };

};

function pickDifficulty() {
  var difficulties = document.getElementsByName('difficulty');
  
  for (var i = 0; i < difficulties.length; i++) {
    if (difficulties[i].checked) {
      return difficulties[i].value;
    };
  };
};

function getLettersFromDOM () {
  var letters = Array.from(document.getElementsByClassName('letter'));
  
  for (var i = 0; i < letters.length; i++) {
    letters[i] = letters[i].innerHTML.toUpperCase();
  }

  return letters;
}

function writeLettersToDOM (newOrder) {
  var domNode = document.getElementById('word');

  var classes = [];

  while (domNode.firstChild) {
    classes.push(domNode.firstChild.classList);
    domNode.removeChild(domNode.firstChild);
  };

  for (i = 0; i < newOrder.length; i++) {
    domNode.innerHTML += '<span class=\"letter bounce-letters\" id=\"' + i + '\">' + newOrder[i] + '</span>\n        '
  }

}

function getGuess () {
  var currentGuess = document.getElementById('guess').value.toUpperCase().split('');
  if (compareGuess(currentGuess, getSettings('currentWord').split(',') )) {
    getNewWord();
  };
  switchFocusBackToTextBox();
  setTimeout(function () { document.getElementById('guess').focus(); }, 100);
}

function switchFocusBackToTextBox () {
  var textBox = document.getElementById('guess');
  textBox.value = '';
  textBox.focus();
}

function setAlert (text) {
  if (typeof(text) === 'string') {
    document.getElementById('correctness').innerHTML = text;
  } else {
    console.log('error setting alert');
  }
}

function getNewWord () {
  var settings = getSettings('localSettings');
  
  var currentWord = generateWord(settings).toUpperCase().split('');

  saveSettings('currentWord', currentWord)
  
  writeLettersToDOM(currentWord);
  shuffleLetters();
}

function decrementHeader () {
  var numberNode = document.getElementById('count');
  if (numberNode.innerHTML === 'three words') {
    numberNode.innerHTML = 'two words';
  } else if (numberNode.innerHTML === 'two words') {
    numberNode.innerHTML = 'one word';
  } else if (numberNode.innerHTML === 'one word') {
    numberNode.innerHTML = 'zero words';
  } else {
    console.log('error decrementing header');
  }
}

function resetHeader () {
  var numberNode = document.getElementById('count');
  numberNode.innerHTML = 'three words';
}


// 4. Functions to generate and interact with words

function generateWord (settings) {
  var language = settings[0];
  var difficulty = settings[1];

  var dictionary = [];

  var settings = settings;

  if (language === 'english') {
    return randomizeWord(words[difficulty]);
  } else if (language === 'spanish') {
    return randomizeWord(palabras[difficulty]);
  } else if (language === 'french') {
    return randomizeWord(mots[difficulty]);
  } else {
    console.log('error generating word from language');
  }
};

function randomizeWord (array) {
  return array[randomIndexFromLength(array.length)];
}

function shuffleLetters () {
  var oldLetterOrder = getLettersFromDOM();
  var consumableOrder = getLettersFromDOM();
  var newLetterOrder = changeLetterOrder(consumableOrder);


  while (newLetterOrder == oldLetterOrder) {
    consumableOrder = getLettersFromDOM();
    newLetterOrder = changeLetterOrder(consumableOrder);
  }

  writeLettersToDOM(newLetterOrder);
  bounceLetters();
};

function changeLetterOrder(letterArray) {
  var currentOrder = letterArray;
  var wordLength = currentOrder.length;
  var newOrder = new Array(wordLength);
  var randomIndex = randomIndexFromLength(wordLength);

  while (currentOrder.length > 0) {
    if (typeof(newOrder[randomIndex]) !== 'string') {
      newOrder[randomIndex] = currentOrder.pop();
    } else {
      randomIndex = randomIndexFromLength(wordLength);
    }
  }
  return newOrder;
}

function randomIndexFromLength (length) {
  return Math.floor(Math.random() * length);
}

function compareGuess (guess, answer) {
  var currentGuess = guess.join('');
  var currentAnswer = answer.join('');

  if (currentGuess.length !== currentAnswer.length | currentGuess.sort !== currentAnswer.sort) {
    setAlert('Wrong letters!');
    pulseAlert();
  }

  if (currentGuess.sort === currentAnswer.sort) {
    setAlert('Incorrect!');
    pulseAlert();
  }

  if (currentGuess === currentAnswer) {
    incrementScore();
    decrementHeader();
    console.log(getScore());
    setAlert('Correct!');
    pulseAlert();
  }

  return currentGuess == currentAnswer;
}


// 5. Functions for animation

function pulseAlert () {
  document.getElementById('correctness').classList.remove("hidden");
  document.getElementById('correctness').classList.add("pulse-once");

  setTimeout(function() {
    document.getElementById('correctness').classList.remove("pulse-once");
    document.getElementById('correctness').classList.add("hidden");
  }, 1500);
}

function bounceLetters () {
  var letters = document.getElementById('word').children;

  for (var i = 0; i < letters.length; i++) {
    var currentLetter = document.getElementById(i);
    setTimeout(function () { bounceOneLetter(currentLetter) }, 50); 
  }
}

function bounceOneLetter (letter) {
  var letter = letter;
  letter.classList.add("bounce-letters");
  console.log(letter.classList);
}


// 6. Dictionaries

const words = {
  'easy': ['bear', 'ball', 'fart', 'butt', 'toot'],
  'medium': ['hello', 'world', 'tooth', 'erase', 'biker'],
  'hard': ['pursue', 'window', 'potato', 'pepper', 'fallen']
}

const mots = {
  'easy': ['fear', 'fall', 'fart', 'futt', 'foot'],
  'medium': ['fello', 'forld', 'footh', 'frase', 'fiker'],
  'hard': ['fursue', 'findow', 'fotato', 'fepper', 'fallen']
}

const palabras = {
  'easy': ['sear', 'sall', 'sart', 'sutt', 'soot'],
  'medium': ['sello', 'sorld', 'sooth', 'srase', 'siker'],
  'hard': ['sursue', 'sindow', 'sotato', 'sepper', 'sallen']
}

runGame();