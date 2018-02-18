function reverseNumber(n){
  var number = Math.abs(n) + "";
	var reversed =  number.split("").reverse().join("");
	
  return Number(reversed) * Math.sign(n);
}