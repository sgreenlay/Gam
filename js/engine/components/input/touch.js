
namespace('sg.gam.components.engine.input.touch', (function() {

	var touch = function(canvas) {
		this.canvas = canvas;
		this.event_queue = new Array();
	};

	touch.prototype.capture_input = function capture_input() {
		this.ontouchstart = this.touchstart();
		this.ontouchend = this.touchend();
		this.ontouchcancel = this.touchcancel();
		this.ontouchleave = this.touchleave();
		this.ontouchmove = this.touchmove();
		
		this.canvas.addEventListener("touchstart", this.ontouchstart, false);
		this.canvas.addEventListener("touchend", this.ontouchend, false);
		this.canvas.addEventListener("touchcancel", this.ontouchcancel, false);
		this.canvas.addEventListener("touchleave", this.ontouchleave, false);
		this.canvas.addEventListener("touchmove", this.ontouchmove, false);
	};
	
	touch.prototype.release_input = function release_input() {
		if (this.ontouchstart) {
			this.canvas.removeEventListener("touchstart", this.ontouchstart, false);
			this.ontouchstart = null;
		}
		if (this.ontouchend) {
			this.canvas.removeEventListener("touchend", this.ontouchend, false);
			this.ontouchsend = null;
		}
		if (this.ontouchcancel) {
			this.canvas.removeEventListener("touchcancel", this.ontouchcancel, false);
			this.ontouchcancel = null;
		}
		if (this.ontouchleave) {
			this.canvas.removeEventListener("touchleave", this.ontouchleave, false);
			this.ontouchleave = null;
		}
		if (this.ontouchmove) {
			this.canvas.removeEventListener("touchmove", this.ontouchmove, false);
			this.ontouchmove = null;
		}
	}
	
	touch.prototype.reset = function reset() {
		while (this.next()) {
			// do nothing
		}
		
		// TODO
	};
	
	touch.prototype.poll = function poll() {
		
		// TODO
		
		return null;
	};
	
	touch.prototype.is_valid_event = function is_valid_event(event) {
		return true;
	};
	
	touch.prototype.peek = function peek_next_event() {
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
	
	touch.prototype.next = function next_event() {
		while (this.event_queue && this.event_queue.length > 0) {
			if (!this.is_valid_event(this.event_queue[0])) {
				this.event_queue.shift();
			}
			else {
				var event = this.event_queue.shift();
				
				// TODO
				
				return event;
			}
		}
		return null;
	};
	
	touch.prototype.touchstart = function touchstart() {
		var self = this;
		var ontouchstart = function(evt) {
			evt.preventDefault();
			
			// TODO
		};
		return ontouchstart;
	};
	
	touch.prototype.touchend = function ontouchend(evt) {
		var self = this;
		var ontouchend = function(evt) {
			evt.preventDefault();
			
			// TODO
		};
		return ontouchend;
	};
	
	touch.prototype.touchcancel = function ontouchcancel(evt) {
		var self = this;
		var ontouchcancel = function(evt) {
			evt.preventDefault();
			
			// TODO
		};
		return ontouchcancel;
	};
	
	touch.prototype.touchleave = function ontouchleave(evt) {
		var self = this;
		var ontouchleave = function(evt) {
			evt.preventDefault();
			
			// TODO
		};
		return ontouchleave;
	};
	
	touch.prototype.touchmove = function ontouchmove(evt) {
		var self = this;
		var ontouchmove = function(evt) {
			evt.preventDefault();
			
			// TODO
		};
		return ontouchmove;
	};

	return touch;

})());

loaded('js/engine/components/input/touch.js');
