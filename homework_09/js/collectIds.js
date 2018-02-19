function collectIds(movies){
  var filtered = getFilteredArray(movies, function(el){
    return el.rating > 3.0;
  });
  return getTransformedArray(filtered, function(el){
    return el.id;
  });
}