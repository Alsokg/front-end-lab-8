function getMin() {
  var min = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		min = Math.min(min, arguments[i]);
	}
	return min;
}