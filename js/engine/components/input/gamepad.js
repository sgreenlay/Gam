
namespace('sg.gam.components.engine.input.gamepad', (function() {

	var gamepad = function(canvas) {
		this.canvas = canvas;
		this.event_queue = new Array();
		this.gamepads = new Object();
	};

	gamepad.prototype.capture_input = function capture_input() {
		var pollingSupported = (navigator.getGamepads ||
								navigator.webkitGetGamepads || 
								navigator.mozGetGamepads || 
								navigator.msGetGamepads);
		
		if (!pollingSupported)
		{
			this.gamepadconnectedevent = this.onconnect();
			this.gamepaddisconnectedevent = this.ondisconnect();
			
			window.addEventListener("WebkitGamepadConnected", this.gamepadconnectedevent);
			window.addEventListener("WebkitGamepadDisconnected", this.gamepaddisconnectedevent);
			
			window.addEventListener("MozGamepadConnected", this.gamepadconnectedevent);
			window.addEventListener("MozGamepadDisconnected", this.gamepaddisconnectedevent);
			
			window.addEventListener("MsGamepadConnected", this.gamepadconnectedevent);
			window.addEventListener("MsGamepadDisconnected", this.gamepaddisconnectedevent);
			
			window.addEventListener("GamepadConnected", this.gamepadconnectedevent);
			window.addEventListener("GamepadDisconnected", this.gamepaddisconnectedevent);
		}
	};
	
	gamepad.prototype.release_input = function release_input() {
		if (this.gamepadconnectedevent)
		{
			window.removeEventListener("WebkitGamepadConnected", this.gamepadconnectedevent);
			window.removeEventListener("MozGamepadConnected", this.gamepadconnectedevent);
			window.removeEventListener("MsGamepadConnected", this.gamepadconnectedevent);
			window.removeEventListener("GamepadConnected", this.gamepadconnectedevent);
			
			this.gamepadconnectedevent = null;
		}
		
		if (this.gamepaddisconnectedevent)
		{
			window.removeEventListener("WebkitGamepadDisconnected", this.gamepaddisconnectedevent);
			window.removeEventListener("MozGamepadDisconnected", this.gamepaddisconnectedevent);
			window.removeEventListener("MsGamepadDisconnected", this.gamepaddisconnectedevent);
			window.removeEventListener("GamepadDisconnected", this.gamepaddisconnectedevent);
			
			this.gamepaddisconnectedevent = null;
		}
	}
	
	gamepad.prototype.reset = function reset() {
		while (this.next()) {
			// do nothing
		}
		while (this.gamepads && this.gamepads.length) {
			this.gamepads.shift();
		}
	};
	
	gamepad.prototype.poll = function poll(index) {
		var self = this;
		
		if (self.gamepads[index]) {
			return self.gamepads[index];
		}
		
		return null;
	};
	
	gamepad.prototype.update = function update() {
		var self = this;
		var gamepads = null;
		
		if (navigator.getGamepads) {
			gamepads = navigator.getGamepads();
		}
		else if (navigator.webkitGetGamepads) {
			gamepads = navigator.webkitGetGamepads();
		}
		else if (navigator.mozGetGamepads) {
			gamepads = navigator.mozGetGamepads();
		}
		else if (navigator.msGetGamepads) {
			gamepads = navigator.msGetGamepads();
		}
		
		if (gamepads) {
			for (var i = 0; i < gamepads.length; i++) {
				if (gamepads[i]) {
					if (!self.gamepads[gamepads[i].index]) {
						var event = {
							type : 'gamepad',
							state : 'connected',
							time : new Date(),
							gamepad : gamepads[i]
						};
						self.event_queue.push(event);
						
						self.gamepads[gamepads[i].index] = gamepads[i];
					}
				}
			}
			
			Object.keys(self.gamepads).forEach(function(id) {
				var pad = self.gamepads[id];
				var foundPad = false;
				for (var i = 0; i < gamepads.length; i++) {
					if (gamepads[i] && gamepads[i].index == pad.index) {
						foundPad = true;
					}
				}
				if (!foundPad) {
					var event = {
						type : 'gamepad',
						state : 'disconnected',
						time : new Date(),
						gamepad : pad
					};
					self.event_queue.push(event);
					
					delete self.gamepads[pad.index];
				}
			});
		}
		
		Object.keys(self.gamepads).forEach(function(id) {
			var pad = self.gamepads[id];
			
			// TODO: coelesce and send delta updates
		});
	};
	
	gamepad.prototype.is_valid_event = function is_valid_event(event) {
		return true;
	};
	
	gamepad.prototype.peek = function peek_next_event() {
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
	
	gamepad.prototype.next = function next_event() {
		while (this.event_queue && this.event_queue.length > 0) {
			if (!this.is_valid_event(this.event_queue[0])) {
				this.event_queue.shift();
			}
			else {
				return this.event_queue.shift();
			}
		}
		return null;
	};
	
	gamepad.prototype.onconnect = function onconnect(evt) {
 		var self = this;
 		var onconnecthandler = function(evt) {
	 		if (self.gamepads[evt.gamepad.index]) {
				var event = {
					type : 'gamepad',
					state : 'disconnected',
					time : new Date(),
					gamepad : evt.gamepad
				};
				self.event_queue.push(event);
				
				delete self.gamepads[evt.gamepad.index];
			}
			
			var event = {
	 			type : 'gamepad',
	 			state : 'connected',
	 			time : new Date(),
				gamepad : evt.gamepad
	 		};
	 		self.event_queue.push(event);
	 		
			self.gamepads[evt.gamepad.index] = evt.gamepad;
			
	 		evt.cancelBubble = true;
	 	};
	 	return onconnecthandler;
 	};
	
	gamepad.prototype.ondisconnect = function ondisconnect(evt) {
 		var self = this;
 		var ondisconnecthandler = function(evt) {
			if (self.gamepads[evt.gamepad.index]) {
				var event = {
					type : 'gamepad',
					state : 'disconnected',
					time : new Date(),
					gamepad : evt.gamepad
				};
				self.event_queue.push(event);
				
				delete self.gamepads[evt.gamepad.index];
			}
	 		
	 		evt.cancelBubble = true;
	 	};
	 	return ondisconnecthandler;
	};

	return gamepad;

})());

loaded('js/engine/components/input/gamepad.js');
