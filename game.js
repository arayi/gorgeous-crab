
console.log('start');
console.log(en[0]);

function runGame () {
  var settings = [pickLanguage(), pickDifficulty()];
  var score = 0;

  // while (score < 3) {

  // };

  // winGame();
};

function pickLanguage() {
  var languages = document.getElementsByName('language');
  for (var i = 0; i < languages.length; i++) {
    if (languages[i].checked) {
      if (languages[i].value === 'en') {
        console.log('english')
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

console.log('end');