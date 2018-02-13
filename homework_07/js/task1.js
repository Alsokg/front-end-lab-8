var fromVal = 1;
var toVal = 20;
var number = prompt("Enter natural number in range ["+fromVal+"-"+toVal+"]", 10);
var response = '';
var space = "   ";
var symbol = "[~]";

function isNatural(s){
  var n = parseInt(s, 10);
  return n >= 0 && n.toString() === s;
}

function isInRange(start, end, value){
  var n = parseInt(value, 10);
  return n >= start && n <= end;
}

if (!isNatural(number) || !isInRange(fromVal, toVal, number)){
  console.error("Incorrect");
} else {
  for (var i = 0; i < number; i++){
    for (var j = 0; j < (number - i - 1); j++){
      response += space;
    }
    for (var z = 0; z < i; z++){
      response += symbol + symbol;
    }
    response += symbol + "\n";
  }
  console.log(response);
}
