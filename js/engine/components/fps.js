
require('js/engine/components/graphics/manager.js', function () {

namespace('sg.gam.components.engine.fps', (function() {

	var fps = function() {
		this.counter = 0;
		this.total_elapsed = 0;
		this.fps = 0;
	};

	fps.prototype.tick = function(elapsed) {
		this.counter++;
		this.total_elapsed += elapsed;
		if (this.total_elapsed > 1000) {
			this.total_elapsed -= 1000;
			if (this.total_elapsed > 0) {
				this.fps = this.counter - 1;
				this.counter = 1;
			}
			else {
				this.fps = this.counter;
				this.counter = 0;
			}
		}
	};

	fps.prototype.render = function(interpolation, renderman) {
		renderman.draw_text(4, 18, this.fps.toString() + " fps", 18, "rgba(255,255,255,0.5)");
	};

	return fps;

})());

loaded('js/engine/components/fps.js');

}); // js/engine/components/graphics/manager.js

