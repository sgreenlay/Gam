
namespace('sg.gam.components.engine.input.touch', (function() {

	var touch = function(manager, canvas) {
		this.manager = manager;
		this.canvas = canvas;
		this.event_queue = new Array();
	};

	touch.prototype.capture_input = function capture_input() {
		if (window.PointerEvent) {
			this.onpointerenter = this.pointerenter();
			this.onpointerleave = this.pointerleave();
			this.onpointermove = this.pointermove();
			this.onpointerdown = this.pointerdown();
			this.onpointerup = this.pointerup();

			this.canvas.addEventListener("pointerenter", this.onpointerenter, false);
			this.canvas.addEventListener("pointerleave", this.onpointerleave, false);
			this.canvas.addEventListener("pointermove", this.onpointermove, false);
			this.canvas.addEventListener("pointerdown", this.onpointerdown, false);
			this.canvas.addEventListener("pointerup", this.onpointerup, false);
		}
		else {
			this.ontouchstart = this.touchstart();
			this.ontouchend = this.touchend();
			this.ontouchmove = this.touchmove();

			this.canvas.addEventListener("touchstart", this.ontouchstart, false);
			this.canvas.addEventListener("touchend", this.ontouchend, false);
			this.canvas.addEventListener("touchmove", this.ontouchmove, false);
		}
	};

	touch.prototype.release_input = function release_input() {
		if (this.onpointerenter) {
			this.canvas.removeEventListener("pointerenter", this.onpointerenter, false);
			this.onpointerenter = null;
		}
		if (this.onpointerleave) {
			this.canvas.removeEventListener("pointerleave", this.onpointerleave, false);
			this.onpointerleave = null;
		}
		if (this.onpointermove) {
			this.canvas.removeEventListener("pointermove", this.onpointermove, false);
			this.onpointermove = null;
		}
		if (this.onpointerdown) {
			this.canvas.removeEventListener("pointerdown", this.onpointerdown, false);
			this.onpointerdown = null;
		}
		if (this.onpointerup) {
			this.canvas.removeEventListener("pointerup", this.onpointerup, false);
			this.onpointerup = null;
		}
		if (this.ontouchstart) {
			this.canvas.removeEventListener("touchstart", this.ontouchstart, false);
			this.ontouchstart = null;
		}
		if (this.ontouchend) {
			this.canvas.removeEventListener("touchend", this.ontouchend, false);
			this.ontouchsend = null;
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

			for (var i = 0; i < evt.changedTouches.length; i++) {
				var touch = evt.changedTouches[i];

				var event = {
					type : 'touch',
					state : 'enter',
					time : new Date(),
					id : touch.identifier,
					position : self.manager.map_input_point({
						x : touch.pageX - evt.target.offsetLeft,
						y : touch.pageY - evt.target.offsetTop
					})
				};
				self.event_queue.push(event);

				event = {
					type : 'touch',
					state : 'down',
					time : new Date(),
					id : touch.identifier,
					position : self.manager.map_input_point({
						x : touch.pageX - evt.target.offsetLeft,
						y : touch.pageY - evt.target.offsetTop
					})
				};

				self.event_queue.push(event);
			}

			evt.cancelBubble = true;
		};
		return ontouchstart;
	};

	touch.prototype.touchend = function ontouchend(evt) {
		var self = this;
		var ontouchend = function(evt) {
			evt.preventDefault();

			for (var i = 0; i < evt.changedTouches.length; i++) {
				var touch = evt.changedTouches[i];

				var event = {
					type : 'touch',
					state : 'up',
					time : new Date(),
					id : touch.identifier,
					position : self.manager.map_input_point({
						x : touch.pageX - evt.target.offsetLeft,
						y : touch.pageY - evt.target.offsetTop
					})
				};
				self.event_queue.push(event);

				event = {
					type : 'touch',
					state : 'exit',
					time : new Date(),
					id : touch.identifier,
					position : self.manager.map_input_point({
						x : touch.pageX - evt.target.offsetLeft,
						y : touch.pageY - evt.target.offsetTop
					})
				};
				self.event_queue.push(event);
			}

			evt.cancelBubble = true;
		};
		return ontouchend;
	};

	touch.prototype.touchmove = function ontouchmove(evt) {
		var self = this;
		var ontouchmove = function(evt) {
			evt.preventDefault();

			for (var i = 0; i < evt.changedTouches.length; i++) {
				var touch = evt.changedTouches[i];

				var event = {
					type : 'touch',
					state : 'move',
					time : new Date(),
					id : touch.identifier,
					position : self.manager.map_input_point({
						x : touch.pageX - evt.target.offsetLeft,
						y : touch.pageY - evt.target.offsetTop
					})
				};
				self.event_queue.push(event);
			}

			evt.cancelBubble = true;
		};
		return ontouchmove;
	};

	touch.prototype.pointerenter = function pointerenter(evt) {
		var self = this;
		var onpointerenter = function(evt) {
			if (evt.pointerType == "touch") {
				evt.preventDefault();

				var event = {
					type : 'touch',
					state : 'enter',
					time : new Date(),
					id : evt.pointerId,
					position : self.manager.map_input_point({
						x : evt.pageX - evt.target.offsetLeft,
						y : evt.pageY - evt.target.offsetTop
					})
				};
				self.event_queue.push(event);

				evt.cancelBubble = true;
			}
		};
		return onpointerenter;
	};

	touch.prototype.pointerleave = function pointerleave(evt) {
		var self = this;
		var onpointerleave = function(evt) {
			if (evt.pointerType == "touch") {
				evt.preventDefault();

				var event = {
					type : 'touch',
					state : 'exit',
					time : new Date(),
					id : evt.pointerId,
					position : self.manager.map_input_point({
						x : evt.pageX - evt.target.offsetLeft,
						y : evt.pageY - evt.target.offsetTop
					})
				};
				self.event_queue.push(event);

				evt.cancelBubble = true;
			}
		};
		return onpointerleave;
	};

	touch.prototype.pointermove = function pointermove(evt) {
		var self = this;
		var onpointermove = function(evt) {
			if (evt.pointerType == "touch") {
				evt.preventDefault();

				var event = {
					type : 'touch',
					state : 'move',
					time : new Date(),
					id : evt.pointerId,
					position : self.manager.map_input_point({
						x : evt.pageX - evt.target.offsetLeft,
						y : evt.pageY - evt.target.offsetTop
					})
				};
				self.event_queue.push(event);

				evt.cancelBubble = true;
			}
		};
		return onpointermove;
	};

	touch.prototype.pointerdown = function pointerdown(evt) {
		var self = this;
		var onpointerdown = function(evt) {
			if (evt.pointerType == "touch") {
				evt.preventDefault();

				var event = {
					type : 'touch',
					state : 'down',
					time : new Date(),
					id : evt.pointerId,
					position : self.manager.map_input_point({
						x : evt.pageX - evt.target.offsetLeft,
						y : evt.pageY - evt.target.offsetTop
					})
				};
				self.event_queue.push(event);

				evt.cancelBubble = true;
			}
		};
		return onpointerdown;
	};

	touch.prototype.pointerup = function pointerup(evt) {
		var self = this;
		var onpointerup = function(evt) {
			if (evt.pointerType == "touch") {
				evt.preventDefault();

				var event = {
					type : 'touch',
					state : 'up',
					time : new Date(),
					id : evt.pointerId,
					position : self.manager.map_input_point({
						x : evt.pageX - evt.target.offsetLeft,
						y : evt.pageY - evt.target.offsetTop
					})
				};
				self.event_queue.push(event);

				evt.cancelBubble = true;
			}
		};
		return onpointerup;
	};

	return touch;

})());

loaded('js/engine/components/input/touch.js');
