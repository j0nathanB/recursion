// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node) {
	// add node parameter to specify the node we're operating on
	// create an array that will hold the elements with target class
	// if the current node has a class, and the class list contains the target class, push the node into the array
	// get the target elements
		// some of the elements are nested, e.g. <div class="target"><span class="target"></span></div>
			// nested means parent/child relationship
				// this will have to be handled by the recursive component
				// use for loop to iterate through the list of node children
					// recursively run getElementsByClassName on each child
	//push them into the array
	//return the array

var results = [];

//operate on document.body or node
node = node || document.body;

if(node.classList && node.classList.contains(className)){
	results.push(node);		
}

for (var i = 0; i < node.children.length; i++) {
	var nodeChild = getElementsByClassName(className, node.children[i]);
	results = results.concat(nodeChild);
}

return results;
};
