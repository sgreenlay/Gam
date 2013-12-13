
require('js/engine/components/fps.js', function () {
require('js/engine/components/input/manager.js', function () {
require('js/engine/components/graphics/manager.js', function () {
require('js/engine/components/audio/manager.js', function () {

namespace('sg.gam.engine', (function() {

	var engine = function (canvas) {
		this.graphics = new sg.gam.components.engine.graphics.manager(canvas);
		this.input = new sg.gam.components.engine.input.manager(canvas);
		this.audio = new sg.gam.components.engine.audio.manager();
		
		this.simulationTime = (new Date).getTime();
	};

	engine.prototype.update = function(time) {
		this.input.update();
		
		var event = this.input.peek();
		while (event != null && event.time - time < this.dt) {
			this.game.event_handler(this.input.next());
			event = this.input.peek();
		}
		
		this.game.update(time, this.dt);
	};

	engine.prototype.render = function() {
		this.audio.update();

		this.graphics.clear();

		this.game.render(this.accumulator);
		
		if (this.game.debugMode) {
			this.fps_counter.render(this.accumulator, this.graphics);
		}
	};

	// Ref: http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/index.html
	function setup_game_loop() {
		var onEachFrame;
		if (window.requestAnimationFrame) {
			onEachFrame = function(cb) {
				var _cb = function() {
					cb();
					requestAnimationFrame(_cb);
				}
				_cb();
			};
		}
		else if (window.webkitRequestAnimationFrame) {
			onEachFrame = function(cb) {
				var _cb = function() {
					cb();
					webkitRequestAnimationFrame(_cb);
				}
				_cb();
			};
		}
		else if (window.mozRequestAnimationFrame) {
			onEachFrame = function(cb) {
				var _cb = function() {
					cb();
					mozRequestAnimationFrame(_cb);
				}
				_cb();
			};
		}
		else if (window.msRequestAnimationFrame) {
			onEachFrame = function(cb) {
				var _cb = function() {
					cb();
					msRequestAnimationFrame(_cb);
				}
				_cb();
			};
		}
		else {
			onEachFrame = function(cb) {
				setInterval(cb, 1000 / 60);
			}
		}
		window.onEachFrame = onEachFrame;
	}

	engine.prototype.run = function(game) {
		setup_game_loop();

		this.dt = 100;
		this.currentTime = (new Date).getTime();
		this.accumulator = 0;

		this.fps_counter = new sg.gam.components.engine.fps();
		this.input.capture_input();

		this.game = game;
		this.game.init(this);

		var self = this;

		// Ref: http://gafferongames.com/game-physics/fix-your-timestep/
		window.onEachFrame(function() {
			var newTime = (new Date).getTime();
			var frameTime = newTime - self.currentTime;
			if (frameTime > 300) {
				frameTime = 300;
			}

			var accumulatorTime = self.currentTime - self.accumulator;
			self.currentTime = newTime;
			self.accumulator += frameTime;

			var loops = 0;
			while (self.accumulator >= self.dt)
			{
				 self.update(accumulatorTime);
				 self.accumulator -= self.dt;
				 accumulatorTime += self.dt;
				 loops++;
			}
			self.render();
			self.fps_counter.tick(frameTime);
		});
	};

	return engine;

})());

loaded('js/engine/main.js');

}); // js/engine/components/audio/manager.js
}); // js/engine/components/graphics/manager.js
}); // js/engine/components/input/manager.js
}); // js/engine/components/fps.js
