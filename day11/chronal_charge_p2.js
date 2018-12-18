var serialNumber = 1308;
var fuelGrid = [];
var totalPower = 0;
var totalPowerCoords = [];

for (var y = 0; y < 300; y ++) {
    fuelGrid[y] = [];
    for (var x = 0; x < 300; x ++) {
        var xCoord = x + 1;
        var yCoord = y + 1;
        var rackId = xCoord + 10;
        var powerLevel = rackId * yCoord;
        powerLevel = ((powerLevel + serialNumber) * rackId).toString();
        var finalPower = Number(powerLevel[powerLevel.length - 3]) -5;
        fuelGrid[y][x] = finalPower;
    }
}

for (var y = 0; y < 300; y++) {
    for (var x = 0; x < 300; x++) {
        evaluateGrid(x, y);
    }
}

function evaluateGrid(x, y) {
    var maxLength = (x > y) ? (300 - x) : (300 - y);
    var gridValue = 0;
    for (var offset = 0; offset < maxLength; offset++){
        //all values in row
        var startY = y;
        for (var startY = y + offset; startY <= y + offset; startY++) {
            var startX = x;
            for (startX; startX <= x + offset; startX++) {
                gridValue += fuelGrid[startY][startX];
            }
        }
        //all values in column
        var startX = x;
        for (var startX = x + offset; startX <= x + offset; startX++) {
            var startY = y;
            for (startY; startY < y + offset; startY++) {
                gridValue += fuelGrid[startY][startX];
            }   
        }
        if (gridValue > totalPower) {
            totalPower = gridValue;
            totalPowerCoords = [x + 1,y + 1,offset + 1]
        }
    }
}

console.log(totalPower, totalPowerCoords);
