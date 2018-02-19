function decypherPhrase(obj, str){
	var newObj = {};
	for (var prop in obj) {
		newObj[obj[prop]] = prop;
	}
  return cypherPhrase(newObj, str);
}