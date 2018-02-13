var prizes = [10,5,2];
var currentUserPrize = 0;

var isFailed = false;

var currency = "$";
var attemts = 3;

var fromVal = 0;
var toVal = 5;
var msg;

//used from prevTask
function isNatural(s){
  var n = parseInt(s, 10);
  return n >= 0 && n.toString() === s;
}
//used from prevTask
function isInRange(start, end, value){
  var n = parseInt(value, 10);
  return n >= start && n <= end;
}

function updateMsg(attemtsLeft){
    msg = "Enter natural number in range ["+fromVal+"-"+toVal+"]";
    msg += "\n";
    msg += "Attemts left: " + attemtsLeft.toString();
    msg += "\n";
    msg += "Total prize: " + currentUserPrize.toString() + currency;
    msg += "\n";
    msg += "Possible prize on current attemt: " + (currentUserPrize + prizes[attemts - attemtsLeft]).toString() + currency;
}
function showResult(){
    console.log("Thank you for a game. Your prize is: " + currentUserPrize.toString() + currency);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function updateGameSettings(attemt){
    currentUserPrize += prizes[attemt];
    prizes.forEach(function(prize, index){
        prizes[index] *= 3;
    });
    fromVal *= 2;
    toVal *= 2;
}

if (confirm("Do you want to play a game?")){
    //game started
    do {
        let rand = getRandomInt(fromVal, toVal);
        //console.log(rand);
        let attemtCounter = 0;
        updateMsg(attemts);
        while (attemtCounter < attemts && !isFailed){
            var number = prompt(msg, 0);
            if ((!isNatural(number) || !isInRange(fromVal, toVal, number))){
                isFailed = true;
            } else {
                if (number == rand){
                    updateGameSettings(attemtCounter);
                    attemtCounter = attemts;
                } else if (attemtCounter == attemts-1){
                    isFailed = true;
                }
            }
            attemtCounter++;
            updateMsg(attemts - attemtCounter);
        }
    } while (!isFailed && confirm("Do you want to continue a game?"));
    showResult();
} else {
    showResult();
}

