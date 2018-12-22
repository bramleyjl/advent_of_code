var fs = require('fs')
//var input = fs.readFileSync('./test_input.txt').toString().split('\n');
var input = fs.readFileSync('./real_input.txt').toString().split('\n');
var initialState = input.shift().substring(15).split('');
input.splice(0, 1);
input.splice(-1, 1);

//create list of change conditions
var changes = {};
for (var row of input) {
    var condition = row.substring(0, 5);
    var outcome = row.substring(9);
    changes[condition] = outcome;
}
var changeArray = Object.keys(changes);

//create plants array
var currentGeneration = [];
for (var p = 0; p < initialState.length; p++) {
    plant = {
        'index' : p,
        'status': initialState[p]
    };
    currentGeneration.push(plant);
}

for (var generation = 0; generation < 50000000000; generation++) {
    currentGeneration = padSides(currentGeneration);
    var nextGeneration = [];
    for (var plant = 2; plant < (currentGeneration.length - 3); plant++) {
        var index = currentGeneration[plant].index;
        var growth = checkGrowth(currentGeneration, plant);
        var futurePlant = {
            'index': index,
            'status': growth
        }
        nextGeneration.push(futurePlant);
    }
    currentGeneration = nextGeneration;
}
totalPlants = countPots(currentGeneration);
console.log(totalPlants)

function countPots(plants) {
    var count = 0;
    for (var c = 0; c < plants.length; c++) {
        if (plants[c].status === '#' ) {
            count += plants[c].index;
        }
    }
    return count;
}

function checkGrowth(row, plant) {
    var environment = '';
    for (var i = (plant - 2); i < (plant + 3); i ++) {
        environment += row[i].status;
    }
    if (changeArray.indexOf(environment) !== -1) { 
        return changes[environment];
    } else {
        return '.';
    }
}

function padSides(plants) {
    var startLength = plants[0].index;
    var endLength = plants[plants.length - 1].index;
    for (var i = 0; i < 4; i ++) {
        if (plants[i].status === '#') {
            var addFront = 4 - i;
            break;
        }
    }
    for (var j = 0; j < 4; j ++) {
        if (plants[(plants.length -1) - j].status === '#') {
            var addRear = 4 - j;
            break;
        }
    }

    for (var i = 1; i <= addFront; i++) {
        var plant = {
            'index' : startLength - i,
            'status': '.'           
        }
        plants.unshift(plant);
    }
    for (var j = 1; j <= addRear; j++) {
        var plant = {
            'index' : endLength + j,
            'status': '.'           
        }
        plants.push(plant);
    }
    return plants;
}   