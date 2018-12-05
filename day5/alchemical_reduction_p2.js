var fs = require('fs')

//create alphabetically tripped polymers
var stableVariations = {};
for (var a = 0; a < 26; a++) {
  //var testPolymer = fs.readFileSync('./test_polymer.txt').toString().split('');
  var testPolymer = fs.readFileSync('./real_polymer.txt').toString().split('');
  var letter = (a+10).toString(36);
  for (var j = testPolymer.length -1; j >= 0; j--) {
    if (testPolymer[j] == letter || testPolymer[j] == letter.toUpperCase()) {
      testPolymer.splice(j, 1);
    }
  }
  var stable = reactPolymer(testPolymer);
  stableVariations[letter] = stable.length;
}

console.log(stableVariations);

function reactPolymer(polymer) {
  var noReaction = true;
  for (i = 0; i < polymer.length-1; i++) {
    if (polymer[i].toUpperCase() === polymer[i+1].toUpperCase()) {
      if (
        (polymer[i] === polymer[i].toUpperCase() && 
         polymer[i+1] === polymer[i+1].toLowerCase()) ||
        (polymer[i] === polymer[i].toLowerCase() &&
         polymer[i+1] === polymer[i+1].toUpperCase())
      ) {
        polymer.splice(i, 2);
        noReaction = false;
      }
    }
  }
  if (noReaction == true) {
    return polymer;
  } else {
    return reactPolymer(polymer);
  }
}