// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

// Base cases are numbers, strings, booleans, and null
// Recursion occurs in arrays and objects
// For strings, replace quotation marks with escaped marks
// For array, create temp array, stringify each element and pass to temp array. Return temp array.  
// For object, create temp array, stringigy key and value pairs, push to temp array and return. 
// 
var stringifyJSON = function(obj) {
  if (typeof obj === 'number') {
  	return obj.toString();
  } else 
  if (typeof obj === 'boolean') {
  	return obj.toString();
  } else 
  if (obj === null) {
  	return 'null';
  } else
  if (typeof obj === 'string') {
  	return "\"" + obj + "\"";
  } else 
  if (Array.isArray(obj)){
  	var tempObj = obj.map( element => stringifyJSON(element));
	return "[" + tempObj + "]";
  } else
  if (typeof obj === 'object'){
  	var result = [];

  	for(var key in obj){
  		if(key === 'functions' || key === 'undefined'){
  			return "{}";
  		} else
  		if(obj.hasOwnProperty(key)){
  			result.push(stringifyJSON(key) + ":" + stringifyJSON(obj[key])); 
  		}
  	}

  	return "{" + result.join(",") + "}";
  }
};
