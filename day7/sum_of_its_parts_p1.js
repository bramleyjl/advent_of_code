var fs = require('fs')
//var steps = fs.readFileSync('./test_steps.txt').toString().split('\n');
var steps = fs.readFileSync('./real_steps.txt').toString().split('\n');
var instructions = {};
var orderedInstructions = [];

for (step of steps) {
  var result = step.match(/[A-Z]\s/g)
  var firstStep = result[0].trim();
  var secondStep = result[1].trim();

  var lettersPresent = Object.keys(instructions);
  if (lettersPresent.indexOf(firstStep) !== -1) {
    instructions[firstStep].push(secondStep);
  } else {
    instructions[firstStep] = [secondStep];
  }
  if (lettersPresent.indexOf(secondStep) === -1) {
    instructions[secondStep] = [];
  } 

}

instructions = orderKeys(instructions);

while (Object.keys(instructions).length > 0) {
  for (var i = 0; i < Object.keys(instructions).length; i ++) {
    var currentLetter = Object.keys(instructions)[i];
    var blockedLetters = Object.values(instructions).reduce(function(a, b) {
      return a.concat(b);
    }, []);

    if (blockedLetters.indexOf(currentLetter) === -1) {
      orderedInstructions.push(currentLetter);
      delete instructions[currentLetter];
      for (var list in instructions) {
        var index = instructions[list].indexOf(currentLetter);
        if (index !== -1) instructions[list].splice(index, 1);
      }
      break;
    }
  }
}

console.log(orderedInstructions.join(''))

function orderKeys(obj, expected) {
  var keys = Object.keys(obj).sort(function keyOrder(k1, k2) {
      if (k1 < k2) return -1;
      else if (k1 > k2) return +1;
      else return 0;
  });

  var i, after = {};
  for (i = 0; i < keys.length; i++) {
    after[keys[i]] = obj[keys[i]];
    delete obj[keys[i]];
  }

  for (i = 0; i < keys.length; i++) {
    obj[keys[i]] = after[keys[i]];
  }
  return obj;
}