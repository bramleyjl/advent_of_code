//test input
// var players = 9;
// var marbleCount = 25;

//real input
var players = 424;
var marbleCount = 71144;

var playerScores = {};
var currentPlayer = 1;
var gameCircle = [0];
var currentMarble = 0;

//create player's score object
for (var i = 1; i <= players; i++) {
  playerScores[i] = 0;
}

for (var i = 1; i <= marbleCount; i++) {
  if (i % 23 == 0 && i !== 0) {
    playerScores[currentPlayer] += Number(i);
    if (currentMarble >= 7) {
      var removeIndex = currentMarble - 7;
    } else {
      var removeIndex = gameCircle.length - (7 - currentMarble);
    }
    var removedMarble = gameCircle.splice(removeIndex, 1);
    playerScores[currentPlayer] += Number(removedMarble);
    currentMarble = removeIndex;
  } else {
    if (currentMarble == gameCircle.length -1) {
      var newInsert = 1;
    } else {
      var newInsert = currentMarble + 2;
    }
    gameCircle.splice(newInsert, 0, i);
    currentMarble = gameCircle.indexOf(i);
  }
  if (currentPlayer == players) {
    currentPlayer = 1;
  } else {
    currentPlayer += 1;
  }
}

playerScores = Object.values(playerScores);
playerScores.sort(function (a, b) {
  return b - a
})

console.log(playerScores[0])