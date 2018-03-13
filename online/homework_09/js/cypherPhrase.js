function cypherPhrase(obj, str){
  var newArray = getTransformedArray(str, function(el) {
	return obj[el] || el;
});
return newArray.join("");
}