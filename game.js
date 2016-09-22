
// 1. Main game loop and helper functions
// 2. Interaction with locally stored settings
// 3. Functions to retrieve settings from DOM
// 4. Functions to generate and interact with words
// 5. Functions for animation


// 1. Main game loop and helper functions

function runGame () {
  var settings = [pickLanguage(), pickDifficulty()];
  var score = 0;

  localStorage.clear();

  saveSettings('localSettings', settings)
  saveSettings('currentGameScore', score)

  var mainGameInterval = setInterval(function() {
    if (checkForWin() === true) {
      clearInterval(mainGameInterval);
      winGame();
    }
  }, 1000);

};

function checkForWin () {
  if (getScore() === 3) {
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
    return String.split(',')
  } else if (name === 'currentGameScore') {
    return (parseInt(localStorage.getItem(name)));
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


// 3. Functions to retrieve settings from DOM

function pickLanguage() {
  var languages = document.getElementsByName('language');
  for (var i = 0; i < languages.length; i++) {
    if (languages[i].checked) {
      if (languages[i].value === 'en') {
        return 'english'
      }else if (languages[i].value === 'fr') {
        console.log('french')
      }else
        console.log('spanish')
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

  while (domNode.firstChild) {
    domNode.removeChild(domNode.firstChild);
  };

  for (i = 0; i < newOrder.length; i++) {
    domNode.innerHTML += '<span class=\"letter\" id=\"' + i + '\">' + newOrder[i] + '</span>\n        '
  }

}

function getGuess () {
  var currentGuess = document.getElementById('guess').value.toUpperCase().split('');
  console.log(compareGuess(currentGuess, ['w', 'o', 'r', 'd']));
}

function setAlert (text) {
  if (typeof(text) === 'string') {
    document.getElementById('correctness').innerHTML = text;
  } else {
    console.log('error setting alert');
  }
}


// 4. Functions to generate and interact with words

function generateWord (settings) {
  var language = settings[0];
  var difficulty = settings[1];
  var dictionary = [];

  if (language === 'en') {
  }
};

function shuffleLetters () {
  var oldLetterOrder = getLettersFromDOM();
  var consumableOrder = getLettersFromDOM();
  var newLetterOrder = changeLetterOrder(consumableOrder);

  while (newLetterOrder == oldLetterOrder) {
    consumableOrder = getLettersFromDOM();
    newLetterOrder = changeLetterOrder(consumableOrder);
  }

  writeLettersToDOM(newLetterOrder);
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

  console.log(currentGuess === currentAnswer);
  console.log(currentGuess == currentAnswer);
  console.log(document.getElementById('correctness'));

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

runGame();