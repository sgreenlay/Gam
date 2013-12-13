/*
* require.js
* Scott Greenlay
*/

var require_files = new Object();

function loaded(src) {
	if (typeof require_files[src] != 'undefined') {
		require_files[src].status = 'complete';
		if (typeof require_files[src].completion != 'undefined') {
			require_files[src].completion();
		}
		delete require_files[src].completion;
	}
}

function require(src, onload) {
	if (typeof require_files[src] != 'undefined') {
		if (require_files[src].status === 'complete') {
			if (typeof onload != 'undefined') {
				onload();
			}
		}
		else if (require_files[src].status === 'waiting') {
			console.log("ERROR: circular dependancies.")
		}
	}
	else {
		var script_file = document.createElement('script');
		script_file.type = 'text/javascript';
		script_file.src = src;
		document.getElementsByTagName('head')[0].appendChild(script_file);
		require_files[src] = {
			status: 'waiting',
			completion: onload
		};
	}
}
