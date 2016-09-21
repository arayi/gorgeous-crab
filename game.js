


console.log('start');

function runGame () {
  var settings = [pickLanguage(), pickDifficulty()];
  var score = 0;

  saveSettings('localSettings', settings)
  saveSettings('currentGameScore', score)




  // while (score < 3) {

  // };

  // winGame();
};

function saveSettings(name, settings) {
  var name = name.toString();
  console.log(name);

  var settings = settings.toString();
  if (typeof(name) === 'string' && typeof(settings) === 'string') {
    localStorage.setItem(name, settings);
  } else {
    console.log('error saving state of: ' + name + ': ' + settings);
  }
}

function getSettings(name) {
  return localStorage.getItem(name)
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

function shuffleLetters (currentWord) {

};

function isCorrect (answer, word) {
 return answer.toLowercase() === word.toLowercase();
};

function winGame () {

};

runGame();

console.log('end');
