app.filter('translate', function($rootScope) {
  return function(input, type, lang) {
  	var translation = translations[$rootScope.language][type][input];
    return translation ? translation : input;
  }
})