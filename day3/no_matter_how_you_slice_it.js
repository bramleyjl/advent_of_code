var fs = require('fs')
//var claims = fs.readFileSync('./test_claims.txt').toString().split('\n');
var claims = fs.readFileSync('./real_claims.txt').toString().split('\n');
var totalArea = [];

function fabricChecker(claims, mapping = true) {
  for (var claim of claims) {
    //get offsets and lengths out of string claim
    xOffset = claim.match(/\d+,/);
    xOffset = Number(xOffset[0].replace(',', ''));
    yOffset = claim.match(/,\d+/);
    yOffset = Number(yOffset[0].replace(',', ''));
    xLength = claim.match(/\d+x/);
    xLength = Number(xLength[0].replace('x', ''));
    yLength = claim.match(/x\d+/);
    yLength = Number(yLength[0].replace('x', ''));

    if (mapping == true) {
      var conflicts = 0;
      for (var y = 0; y < yOffset + yLength; y++) {
        if (totalArea[y] === undefined) {
          totalArea[y] = [];
        }
        for (var x = 0; x < xOffset + xLength; x++) {
          if (totalArea[y][x] == 'X') {
            if (x >= xOffset && y >= yOffset) {
              totalArea[y][x] = '!';
              conflicts += 1;
            }
          } else if (totalArea[y][x] !== '!') {
            if (x >= xOffset && y >= yOffset) {
              totalArea[y][x] = 'X';
            } else {
              totalArea[y][x] = '.';
            }       
          }
        }
      }
    } else {
      var overlap = false;
      for (var y = yOffset; y < yOffset + yLength; y++) {
        for (var x = xOffset; x < xOffset + xLength; x++) {
          if (totalArea[y][x] !== 'X') {
            overlap = true;
          }
        }
      }
      if (overlap == false) {
        console.log(claim);
      }
    }

  }
  if (mapping == true) {
    console.log(conflicts)
    fabricChecker(claims, false)
  }
}

fabricChecker(claims);