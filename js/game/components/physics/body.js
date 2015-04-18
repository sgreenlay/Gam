
namespace('sg.game.components.physics.body', (function() {
    var body = function(x, y, width, height, mass) {
        this.position = {
            x : x,
            y : y,
        };
        this.size = {
            width : width,
            height : height,
        };
        this.mass = mass;
        this.velocity = {
            x : 0,
            y : 0,
        };
        this.acceleration = {
            x : 0,
            y : 0,
        };
    };

    body.prototype.is_colliding_with = function(otherBody) {
        var self = this;

        // http://stackoverflow.com/a/13390495/169021
        if ((self.position.x + self.size.width <=  otherBody.position.x) ||
            (otherBody.position.x + otherBody.size.width <=  self.position.x) ||
            (self.position.y + self.size.height <=  otherBody.position.y) ||
            (otherBody.position.y + otherBody.size.height <=  self.position.y))
        {
            return false;
        }

        return true;
    }

    body.prototype.collide_with = function(otherBody) {
        var self = this;

        if (!self.is_colliding_with(otherBody))
        {
            return;
        }

        // TODO
    }

    body.prototype.update = function(dt) {
        var self = this;

        self.velocity.x += (self.acceleration.x * dt) / 1000.0;
        self.velocity.y += (self.acceleration.y * dt) / 1000.0;

        self.position.x += (self.velocity.x * dt) / 1000.0;
        self.position.y += (self.velocity.y * dt) / 1000.0;
    };

    body.prototype.draw = function(renderman) {
        var self = this;

        renderman.draw_rectangle(
            self.position.x - self.size.width / 2,
            self.position.y - self.size.height / 2,
            self.size.width,
            self.size.height,
            "#ff0000");
    };

    return body;
})());

loaded('js/game/components/physics/body.js');
