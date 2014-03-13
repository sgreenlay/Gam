
namespace('sg.gam.components.engine.input.keyboard', (function() {

	var keyboard = function(canvas) {
		this.canvas = canvas;
		this.event_queue = new Array();
		this.keys = new Object();
	};

	keyboard.prototype.capture_input = function capture_input() {
		document.onkeydown = this.onkeydown();
		document.onkeyup = this.onkeyup();
	};

	keyboard.prototype.release_input = function release_input() {
		document.onkeydown = null;
		document.onkeyup = null;
	}

	keyboard.prototype.reset = function reset() {
		while (this.next()) {
			// do nothing
		}
		this.keys = new Object();
	};

	keyboard.prototype.poll = function poll(key) {
		var self = this;

		if (typeof(self.keys[key]) != 'undefined') {
			return self.keys[key];
		}

		return false;
	};

	keyboard.prototype.is_valid_event = function is_valid_event(event) {
		var self = this;

		// coalesce duplicate entries for browsers that heartbeat key down/up
		if (typeof(self.keys[event.key]) != 'undefined') {
			if (self.keys[event.key] && (event.state == 'down')) {
				return false;
			}
			if (!self.keys[event.key] && (event.state == 'up')) {
				return false;
			}
		}
		return true;
	};

	keyboard.prototype.peek = function peek_next_event() {
		while (this.event_queue && this.event_queue.length > 0) {
			if (!this.is_valid_event(this.event_queue[0])) {
				this.event_queue.shift();
			}
			else {
				return this.event_queue[0];
			}
		}
		return null;
	};

	keyboard.prototype.next = function next_event() {
		var self = this;
		while (this.event_queue && this.event_queue.length > 0) {
			if (!this.is_valid_event(this.event_queue[0])) {
				this.event_queue.shift();
			}
			else {
				var event = this.event_queue.shift();

				self.keys[event.key] = (event.state == 'up') ? false : true;

				return event;
			}
		}
		return null;
	};

	keyboard.prototype.onkeydown = function onkeydown(evt) {
 		var self = this;
 		var onkeydownhandler = function(evt) {
	 		var event = {
	 			type : 'key',
	 			state : 'down',
	 			time : new Date(),
	 			key : evt.keyCode
	 		};
	 		self.event_queue.push(event);

	 		evt.cancelBubble = true;
	 	};
	 	return onkeydownhandler;
 	};

	keyboard.prototype.onkeyup = function onkeyup(evt) {
		var self = this;
		var onkeyuphandler = function(evt) {
	 		var event = {
	 			type : 'key',
	 			state : 'up',
	 			time : new Date(),
	 			key : evt.keyCode
	 		};
	 		self.event_queue.push(event);

	 		evt.cancelBubble = true;
	 	};
	 	return onkeyuphandler;
 	};

	return keyboard;

})());

loaded('js/engine/components/input/keyboard.js');
