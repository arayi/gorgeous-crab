


function runGame () {
  var settings = [pickLanguage(), pickDifficulty()];
  var score = 0;

  // localStorage.clear();

  saveSettings('localSettings', settings)
  saveSettings('currentGameScore', score)

  while (getScore() < 3) {
    saveSettings('currentGameScore', score++)
    console.log(getScore());
  };

  winGame();
};

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
  return getSettings('currentGameScore');
}

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

function generateWord (settings) {
  var language = settings[0];
  var difficulty = settings[1];
  var dictionary = [];

  if (language === 'en') {
  }
};

function shuffleLetters () {
  var word = getLetters();
  console.log(word);
};

function getLetters () {
  var letters = Array.from(document.getElementsByClassName('letter'));
  console.log(letters);
  for (var i = 0; i < letters.length; i++) {
    console.log(letters[i].innerHTML);
  }
}

function isCorrect (answer, word) {
 return answer.toLowercase() === word.toLowercase();
};

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
