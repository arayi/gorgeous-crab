var english = require("an-array-of-english-words");
var spanish = require("an-array-of-spanish-words");
var french = require("an-array-of-french-words");

function gameMain (language, difficulty) {
  var settings = [language, difficulty];
  var score = 0;
};

function generateWord (settings) {
  var language = settings[0];
  var difficulty = settings[1];


};

function shuffleLetters (currentWord) {

};

function isCorrect (answer, word) {
 return answer.toLowercase() === word.toLowercase();
};