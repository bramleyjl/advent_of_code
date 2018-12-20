var fs = require('fs')
var input = fs.readFileSync('./test_input.txt').toString().split('\n');
var currentState = input.shift().substring(15).split('');
input.splice(0, 1);
input.splice(-1, 1);

var changes = {};
for (var row of input) {
    var condition = row.substring(0, 5);
    var outcome = row.substring(9);
    changes[condition] = outcome;
}
var changeArray = Object.keys(changes);

for (var generation = 0; generation < 1; generation++) {
    currentState = padSides(currentState);
    var nextGeneration = [];
    for (var plant = 2; plant < (currentState.length - 2); plant++) {
        var futurePlant = checkGrowth(currentState, plant);
        console.log(futurePlant);
        nextGeneration.push(futurePlant);
    }
    currentState = dePadSides(nextGeneration);
}

function checkGrowth(row, plant) {
    var environment = row.slice((plant - 2), (plant + 3)).join('');
    if (changeArray.indexOf(environment) !== -1) { 
        return changes[environment];
    } else {
        return '.';
    }
}

function padSides(plants) {
  const leftSide = ['.','.','.','.'];
  const rightSide = ['.','.','.','.'];
  const paddedPlants = leftSide.concat(plants, rightSide);
  return paddedPlants;
}

function dePadSides(plants) {
    //add '.' stripping from sides next
}
