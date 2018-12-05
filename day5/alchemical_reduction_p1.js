var fs = require('fs')
//var polymer = fs.readFileSync('./test_polymer.txt').toString().split('');
var polymer = fs.readFileSync('./real_polymer.txt').toString().split('');

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

const stable = reactPolymer(polymer);
console.log(stable, stable.length);