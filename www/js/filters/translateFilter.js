app.filter('translate', function($rootScope) {

	var breakStringToNumbersAndStrings = function(inStr, inObj){

  	var stringsInInput = [];
  	var numbersInInput = [];
  	
  	var tempNum = '';	//needs to be string
  	var tempStr = '';

  	var storeNumber = function(numbersInInput){
			if(tempNum.length > 0){
				numbersInInput.push(parseInt(tempNum));
				tempNum = '';
			};
		};

		var storeString = function(stringsInInput){
			if(tempStr.length > 0){
				stringsInInput.push(tempStr);
				tempStr = '';
			};
		};

  	for (var i = 0, len = inStr.length; i < len; i += 1){

  		if (isNaN(parseInt(inStr[i]))){
  			//isStr
	 			storeNumber(numbersInInput);
	 			tempStr = tempStr.concat(inStr[i])

  		} else {
  			//isnNum

  			storeString(stringsInInput);
  			tempNum = tempNum.concat(inStr[i])

  		}

  	};

  	storeNumber(numbersInInput);
  	storeString(stringsInInput);


  	if(inObj) inObj = {
  		strings: stringsInInput,
  		numbers: numbersInInput
  	};

  	return {
  		strings: stringsInInput,
  		numbers: numbersInInput
  	};

	};

	var buildNewStringFromData = function(translation, data){

		var translatedStrings = breakStringToNumbersAndStrings(translation).strings;

		var newString = '';
		
		for (var i in translatedStrings){
			newString = newString.concat(translatedStrings[i]).concat((data.numbers[i] !== undefined) ? data.numbers[i] : '');
		};

		return newString;

	}

	var getModdedString = function(data) {
		var moddedString = '';

		var lastString = data.strings.length -1;

  	for (var i in data.strings){
  		moddedString = moddedString.concat(data.strings[i]);
  		if(i < lastString) moddedString = moddedString.concat('0');		//creating a string where the original numbers arereplaced with 0s
  		//TODO: just cut off the last 0 after this loop instead of the above condition
  	};

  	return moddedString;

	};

  return function(input, type, lang) {
  	
  	var translation = translations[ $rootScope.language ][type][input];
  	
  	if (translation) return translation;

  	//matching translation key is missing
  	//replace numbers with 0s and try again
  	var data = breakStringToNumbersAndStrings(input);
  	var moddedString = getModdedString(data);
  	var translation = translations[$rootScope.language][type][moddedString];

  	if (translation) return buildNewStringFromData(translation, data);
  	
  	//still missing
  	console.log('ADD THIS TO ' + type + ' DICT: ', "'" + moddedString + "'")
    return '!DICT: ' + input;

  }
})