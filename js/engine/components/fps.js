
require('js/engine/components/graphics/manager.js', function () {

namespace('sg.gam.components.engine.fps', (function() {

    var fps = function(engine) {
        this.engine = engine;
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

    fps.prototype.render = function() {
        this.engine.graphics.draw_text(4, 18, this.fps.toString() + " fps", 18, "#ffffff");
    };

    return fps;

})());

loaded('js/engine/components/fps.js');

}); // js/engine/components/graphics/manager.js
