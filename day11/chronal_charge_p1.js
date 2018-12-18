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
        if (y >=2 && x >=2) evaluateGrid(x, y);
    }
}

function evaluateGrid(x, y) {
    var gridPower = 0;
    var startX = x - 2;
    var startY = y - 2;
    for (y; y >= startY; y --) {
        var resetX = x;
        for (resetX; resetX >= startX; resetX--) {
            gridPower += Number(fuelGrid[y][resetX]);
        }
    }
    if (gridPower > totalPower) {
        totalPower = gridPower;
        totalPowerCoords = [startX + 1, startY + 1];
    }
}

console.log(totalPower, totalPowerCoords);
