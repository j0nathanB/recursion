// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // follow JSON grammar to parse:
  // <JSON>     ::= <value>
	// <value>    ::= <object> | <array> | <boolean> | <string> | <number> | <null>
	// <array>    ::= "[" [<value>] {"," <value>}* "]"
	// <object>   ::= "{" [<property>] {"," <property>}* "}"
	// <property> ::= <string> ":" <value>
  //  

  var index; 
  var ch;

// helper function to move the index and return the next char
  var next = function() {
	  index++;
	  ch = json.charAt(index); 
	  return ch;
  };

// when the index encounters a given char, run the corresponding function
// e.g., an array always opens with "[", an object with "{"
// throw undefined if none of the above
var value = function () {
  if (ch === '{') {
  	return parseObject();
  } else
  if (ch === '[') {
  	return parseArray();
  } else 
  if (ch === '\"') {
  	return parseString();
  } else 
  if (ch === 't' || ch === 'f') {
  	return parseBoolean();
  } else
  if (ch === 'n') {
  	return parseNull();
  } else 
  if (ch === '-' || ch >= 0 || ch <= 9) {
  	return parseNumber();
  } else {
    throw undefined;
  }
};

// if four chars in a row are "null" return null
var parseNull = function() {
  	var result = '';

  	if(ch === 'n'){
  	  	for(var i = 0; i < 4; i++){
  	  		result += ch;
  	  		next();
  		}
  	}

  	if(result === 'null'){
  		return null;
  	}
};

// if sequential characters are "true" or "false", return true or false
var parseBoolean = function() {
  	var result = '';

  	if(ch === 't'){
  	  	for(var i = 0; i < 4; i++){
  	  		result += ch;
  	  		next();
  		}
  	} else 
  	if (ch === 'f') {
  		for(var i = 0; i < 5; i++){
  	  		result += ch;
  	  		next();
  		}
  	}

  	if(result === 'true'){
  		return true;
  	} else
  	if(result === 'false'){
  		return false;
  	}
};

// gets sequential numbers, use truthy values to compare digits
var parseNumber = function() {
  var result = '';

  function getDigits() { 
    while(ch >= 0 && ch <= 9) {
      number += ch;
      next();
    }
  }

  if(ch === '-') {
    result += ch;
    next();
  }

  getDigits();

  if(ch === '.') {
    result += ch;
    next();
    getDigits();
  }

  return Number(result);
};

// set of escape characters for string
var escapeChars = { 
  'b': '\b',
  'n': '\n',
  't': '\t',
  'r': '\r',
  'f': '\f',
  '\"': '\"',
  '\\': '\\'
};

// 
var parseString = function() {
  var string = '';
  
  while(ch){
	  if(ch === '\"') {
	    next();
	    return string;
		}

	  if(ch === '\\') {
	    next();
	    if(escapeChars.hasOwnProperty(ch)) {
	      string += escapeChars[ch];
	    } 
	  } else {
	    string += ch;
	  }
	  next();
	}
};

// returns an array
// starts parsing array at "[". When finds a closing bracket, return array
// run value function after the initial "[" per JSON grammar 
// continue running value function as long as there's a comma after each value
var parseArray = function() {
  var array = [];

  if(next() === ']'){
  	return array;
  }

  do {
    array.push(value());

    if(ch === ']') {
      next();
      return array;
    } 
  }while(ch === ',');
};

// returns an object
// starts parsing array at "{". When finds "}", return array
// after initial "{", run parseString to get the key, run value to assign value to that key
// run this in a loop, as long as there's a comma after each value
var parseObject = function() {
  var object = {};
  var key = '';

  if(next() === '}'){
  	return object;
  }

  do {
    key = parseString(); 
    next();
    object[key] = value(); 

    if(ch === '}') {  
      next();
      return object;
    }
  } while(ch === ','); 
};

  index = 0;
  ch = json.charAt(index);
  return value();
};
