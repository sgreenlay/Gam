
namespace('sg.gam.components.engine.input.mouse', (function() {

	var mouse = function(canvas) {
		this.canvas = canvas;
		this.event_queue = new Array();
		this.state = 'up';
		this.position = {
			x : 0,
			y : 0,
		};
	};

	mouse.prototype.capture_input = function capture_input() {
		this.canvas.onmousedown = this.onmousedown();
		this.canvas.onmousemove = this.onmousemove();
		this.canvas.onmouseup = this.onmouseup();
	};
	
	mouse.prototype.release_input = function release_input() {
		this.canvas.onmousedown = null;
		this.canvas.onmousemove = null;
		this.canvas.onmouseup = null;
	}
	
	mouse.prototype.poll = function poll() {
		return {
			state : this.state,
			position : this.position
		};
	};
	
	mouse.prototype.is_valid_event = function is_valid_event(event) {
		if (event.type == 'mouse' && event.state == 'down' && this.state == 'down') {
			return false;
		}
		else if (event.type == 'mouse' && event.state == 'up' && this.state == 'up') {
			return false;
		}
		return true;
	};
	
	mouse.prototype.peek = function peek_next_event() {
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
	
	mouse.prototype.next = function next_event() {
		while (this.event_queue && this.event_queue.length > 0) {
			if (!this.is_valid_event(this.event_queue[0])) {
				this.event_queue.shift();
			}
			else {
				var event = this.event_queue.shift();
				
				this.state = event.state;
				this.position = event.position;
				
				return event;
			}
		}
		return null;
	};
	
	mouse.prototype.onmousedown = function onmousedown() {
		var self = this;
		var onmousedownhandler = function(evt) {
		 	var event = {
			 	type : 'mouse',
			 	state : 'down',
			 	time : new Date(),
			 	position : {
				 	x : evt.pageX - evt.target.offsetLeft,
				 	y : evt.pageY - evt.target.offsetTop
			 	}
		 	};
		 	self.event_queue.push(event);
		 	
		 	evt.cancelBubble = true;
	 	};
	 	return onmousedownhandler;
	};
	
	mouse.prototype.onmousemove = function onmousemove() {
		var self = this;
		var onmousemovehandler = function(evt) {
	 		var event = {
	 			type : 'mouse',
	 			state : 'move',
	 			time : new Date(),
	 			position : {
	 				x : evt.pageX - evt.target.offsetLeft,
	 				y : evt.pageY - evt.target.offsetTop
	 			}
	 		};
	 		self.event_queue.push(event);
	 		
	 		evt.cancelBubble = true;
	 	};
	 	return onmousemovehandler;
 	};
	
	mouse.prototype.onmouseup = function onmouseup() {
		var self = this;
		var onmouseuphandler = function(evt) {
		 	var event = {
		 		type : 'mouse',
		 		state : 'up',
		 		time : new Date(),
		 		position : {
		 			x : evt.pageX - evt.target.offsetLeft,
		 			y : evt.pageY - evt.target.offsetTop
		 		}
		 	};
		 	self.event_queue.push(event);
		 	
		 	evt.cancelBubble = true;
	 	};
	 	return onmouseuphandler;
 	};

	return mouse;

})());

loaded('js/engine/components/input/mouse.js');
