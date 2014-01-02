require('js/engine/components/input/manager.js', function () {
require('js/engine/components/graphics/manager.js', function () {

require('js/game/resources/sprites.js', function () {
require('js/game/resources/sounds.js', function () {

require('js/game/components/physics/body.js', function () {
require('js/game/components/physics/world.js', function () {

namespace('sg.game.game', (function() {
	
	var game = function() {
		this.debugMode = true;
	};

	game.prototype.init = function(engine) {
		var self = this;
		
		self.engine = engine;
		
		self.paused = false;
		
		self.resources = new Object();
		self.resources.sprites = new sg.game.resources.sprites(self.engine.graphics);
		self.resources.sounds = new sg.game.resources.sounds(self.engine.audio);

		self.body = new sg.game.components.physics.body(
			self.engine.graphics.width / 2,
			self.engine.graphics.height / 2,
			40,
			40,
			40);

		self.world = new sg.game.components.physics.world(
			self.engine.graphics.width,
			self.engine.graphics.height);

		self.world.bodies.push(self.body);
		
		self.body.acceleration.y = 9.81;
		
		window.onblur = function() {
			self.paused = true;
		};
	};

	game.prototype.event_handler = function(event, dt) {
		var self = this;
		
		if (event.type == 'key' &&
			event.state == 'up'  &&
			event.key == 32)
		{
			self.paused = !self.paused;
			self.engine.audio.play(self.resources.sounds.get('test'));
		}
		else if (event.type == 'gamepad')
		{
			console.log(event);
		}
		
		return false;
	};

	game.prototype.update = function(time, dt) {
		var self = this;
		
		if (!self.paused)
		{
			self.world.update(dt);
		}
	};

	game.prototype.render = function(interpolation) {
		var self = this;
		
		if (!self.paused)
		{
			self.body.draw(self.engine.graphics);
		}
		else
		{
			self.body.draw(self.engine.graphics);
			
			self.engine.graphics.draw_rectangle(
				0,
				0,
				self.engine.graphics.width,
				self.engine.graphics.height,
				"rgba(0, 0, 0, 0.4)");
			
			self.engine.graphics.draw_text_centered(
				self.engine.graphics.width / 2,
				self.engine.graphics.height / 2,
				'paused',
				36,
				"#ffffff");
			
			self.engine.graphics.draw_text_centered(
				self.engine.graphics.width / 2,
				self.engine.graphics.height / 2 + 24,
				'press space to resume',
				18,
				"#ffffff");
		}
	};

	return game;

})());

loaded('js/game/main.js');

}); // js/game/components/physics/world.js
}); // js/game/components/physics/body.js

}); // js/game/resources/sounds.js
}); // js/game/resources/sprites.js

}); // js/engine/components/graphics/manager.js
}); // js/engine/components/input/manager.js
