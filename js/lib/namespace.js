/*
* namespace.js
* Scott Greenlay
*/

function namespace(name, obj) {
	var sequence = name.split('.');
	if (typeof window[sequence[0]] === 'undefined') {
		window[sequence[0]] = new Object();
	}
	var parent = window[sequence[0]];
	for (var i = 1; i < sequence.length - 1; ++i) {
		if (typeof parent[sequence[i]] === 'undefined') {
			parent[sequence[i]] = new Object();
		}
		parent = parent[sequence[i]];
	}
	if (typeof parent[sequence[i]] === 'undefined') {
		parent[sequence[i]] = obj;
	}
	else {
		Object.keys(obj).forEach(function (key) {
			if (typeof parent[sequence[i]][key] === 'undefined') {
				parent[sequence[i]][key] = obj[key];
			}
			else {
				console.log("ERROR: namespace collision");
			}
		});
	}
}
