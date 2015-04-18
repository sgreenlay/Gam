
require('js/engine/components/fps.js', function () {
require('js/engine/components/input/manager.js', function () {
require('js/engine/components/graphics/manager.js', function () {
require('js/engine/components/audio/manager.js', function () {

namespace('sg.gam.engine', (function() {

    var engine = function (canvas) {
        this.input = new sg.gam.components.engine.input.manager(canvas);
        this.graphics = new sg.gam.components.engine.graphics.manager(canvas);
        this.audio = new sg.gam.components.engine.audio.manager();
    };

    engine.prototype.update = function(time, dt) {
        this.input.update();

        var event = this.input.peek();
        while (event != null && event.time - time < dt) {
            this.game.event_handler(this.input.next());
            event = this.input.peek();
        }

        this.game.update(time, dt);
    };

    engine.prototype.render = function() {
        this.audio.update();

        this.graphics.clear();

        this.game.render();
    };

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
        var self = this;

        setup_game_loop();

        self.step_size = 100;
        self.currentTime = (new Date).getTime();
        self.accumulator = 0;

        self.fps_counter = new sg.gam.components.engine.fps(self);
        self.input.capture_input();

        self.game = game;
        self.game.init(self);

        window.onblur = function() {
            self.input.reset();
        };

        window.onEachFrame(function() {
            var newTime = (new Date).getTime();
            var frameTime = newTime - self.currentTime;

            if (frameTime > 5 * self.step_size)
            {
                frameTime = 5 * self.step_size;
            }

            var accumulatorTime = self.currentTime - frameTime;
            var accumulator = frameTime;
            var loops = 0;

            while (accumulator >= self.step_size)
            {
                self.update(accumulatorTime, self.step_size);
                accumulator -= self.step_size;
                accumulatorTime += self.step_size;
                loops++;
            }

            if (accumulator > 0)
            {
                self.update(accumulatorTime, accumulator);
                loops++;
            }

            self.render();

            self.fps_counter.tick(frameTime);
            if (self.game.debugMode) {
                self.fps_counter.render();
            }

            self.currentTime = newTime;
        });
    };

    return engine;

})());

loaded('js/engine/main.js');

}); // js/engine/components/audio/manager.js
}); // js/engine/components/graphics/manager.js
}); // js/engine/components/input/manager.js
}); // js/engine/components/fps.js
