
namespace('sg.game.components.physics.world', (function() {
    var world = function(width, height) {
        this.shape = {
            width : width,
            height : height,
        };
        this.bodies = new Array();
    };

    world.prototype.update = function(dt) {
        var self = this;

        self.bodies.forEach(function(body) {
            body.update(dt);
        });
    };

    world.prototype.interpolate = function(dt, fn) {
        var self = this;

        // TODO: optimize this
        self.update(dt);
		
		fn();
		
        self.update(-dt);
    };

    return world;
})());  

loaded('js/game/components/physics/world.js');
