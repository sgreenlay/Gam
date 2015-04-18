namespace('sg.game.resources.sprites', (function() {
    var sprites = function(renderman) {
        this.image = new Image();
        this.image.src = 'img/sprites.png';

        this.sprites = new Object();
        this.sprites['unknown'] = {
            sx : 0,
            sy : 0,
            sw : 20,
            sh : 20
        };
    };

    sprites.prototype.get = function get(name) {
        if (typeof this.sprites[name] == 'undefined') {
            return this.sprites['unknown'];
        }
        return this.sprites[name];
    };

    return sprites;
})());

loaded('js/game/resources/sprites.js');
