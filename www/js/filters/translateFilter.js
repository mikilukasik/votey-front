app.filter('translate', function($rootScope) {
  return function(input, type, lang) {
  	var translation = translations[$rootScope.language][type][input];
    return translation ? translation : 'Translation missing: ' + input;
  }
})