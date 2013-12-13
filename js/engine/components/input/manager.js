
require('js/engine/components/input/mouse.js', function () {
require('js/engine/components/input/keyboard.js', function () {
require('js/engine/components/input/gamepad.js', function () {
require('js/engine/components/input/touch.js', function () {

namespace('sg.gam.components.engine.input.manager', (function() {

	var manager = function(canvas) {
		this.canvas = canvas;
		
		this.mouse = new sg.gam.components.engine.input.mouse(canvas);
		this.keyboard = new sg.gam.components.engine.input.keyboard(canvas);
		this.gamepad = new sg.gam.components.engine.input.gamepad(canvas);
		this.touch = new sg.gam.components.engine.input.touch(canvas);
	};

	manager.prototype.capture_input = function capture_input() {
		this.mouse.capture_input();
		this.keyboard.capture_input();
		this.gamepad.capture_input();
		this.touch.capture_input();
		
		this.canvas.onselectstart = this.onselectstart();
	};
	
	manager.prototype.release_input = function release_input() {
		this.canvas.onselectstart = null;
		
		this.mouse.release_input();
		this.keyboard.release_input();
		this.gamepad.release_input();
		this.touch.release_input();
	}
	
	manager.prototype.update = function update() {
		this.gamepad.update();
	};
	
	manager.prototype.peek = function peek_next_event() {
		var evt = null;
		
		if (evt == null) {
			evt = this.mouse.peek();
		}
		if (evt == null) {
			evt = this.keyboard.peek();
		}
		if (evt == null) {
			evt = this.gamepad.peek();
		}
		if (evt == null) {
			evt = this.touch.peek();
		}
		
		return evt;
	};
	
	manager.prototype.next = function next_event() {
		var evt = null;
		
		if (evt == null) {
			evt = this.mouse.next();
		}
		if (evt == null) {
			evt = this.keyboard.next();
		}
		if (evt == null) {
			evt = this.gamepad.next();
		}
		if (evt == null) {
			evt = this.touch.next();
		}
		
		return evt;
	};
	
	manager.prototype.onselectstart = function onselectstart() {
		var onselectstarthandler = function() {
			return false;
		};
		return onselectstarthandler;
	};

	return manager;

})());

loaded('js/engine/components/input/manager.js');

}); // js/engine/components/input/touch.js
}); // js/engine/components/input/gamepad.js
}); // js/engine/components/input/keyboard.js
}); // js/engine/components/input/mouse.js
