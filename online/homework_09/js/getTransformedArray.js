function getTransformedArray(arr, func){
  var newArr = [];
  forEach(arr, function(el){
    newArr.push(func(el));
  });
  return newArr;
}