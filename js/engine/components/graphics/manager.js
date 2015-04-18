
namespace('sg.gam.components.engine.graphics.manager', (function() {

    var manager = function(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.fullscreen = false;
    };

    manager.prototype.toggle_fullscreen = function toggle_fullscreen() {
        if (this.fullscreen) {
            if (this.canvas.cancelFullscreen) {
                this.canvas.cancelFullscreen();
            }
            else if (this.canvas.mozCancelFullScreen) {
                this.canvas.mozCancelFullScreen();
            }
            else if (this.canvas.webkitCancelFullscreen) {
                this.canvas.webkitCancelFullscreen();
            }
            else if (this.canvas.msCancelFullscreen) {
                this.canvas.msCancelFullscreen();
            }
        }
        else {
            if (this.canvas.requestFullscreen) {
                this.canvas.requestFullscreen();
            }
            else if (this.canvas.mozRequestFullScreen) {
                this.canvas.mozRequestFullScreen();
            }
            else if (this.canvas.webkitRequestFullscreen) {
                this.canvas.webkitRequestFullscreen();
            }
            else if (this.canvas.msRequestFullscreen) {
                this.canvas.msRequestFullscreen();
            }
        }
    };

    manager.prototype.clear = function clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    };

    manager.prototype.set_alpha = function set_alpha(alpha) {
        this.context.globalAlpha = alpha;
    };

    manager.prototype.draw_rectangle = function draw_rectangle(x, y, w, h, colour) {
        this.context.fillStyle = colour;
        this.context.fillRect(x, y, w, h);
    };

    manager.prototype.draw_line = function draw_rectangle(x1, y1, x2, y2, w, colour) {
        this.context.lineWidth = w;
        this.context.strokeStyle = colour;
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    };

    manager.prototype.draw_text = function draw_text(x, y, text, size, colour) {
        this.context.lineWidth = 1;
        this.context.fillStyle = colour;
        this.context.font = size.toString() + "px Helvetica";
        this.context.fillText(text, x, y);
    };

    manager.prototype.draw_text_centered = function draw_text_centered(x, y, text, size, colour) {
        this.context.lineWidth = 1;
        this.context.fillStyle = colour;
        this.context.textBaseline = 'bottom';
        this.context.font = size.toString() + "px Helvetica";

        var metrics = this.context.measureText(text);

        var x_offset = x;
        if (metrics.width != null)
        {
            x_offset = x - metrics.width / 2;
        }

        var y_offset = y;
        if (metrics.height != null)
        {
            y_offset = y - metrics.height / 2;
        }

        this.context.fillText(text, x_offset, y_offset);
    };

    manager.prototype.draw_image = function draw_image(x, y, w, h, src) {
        this.context.drawImage(src, x, y, w, h);
    };

    manager.prototype.draw_sprite = function draw_sprite(x, y, w, h, src, sprite) {
        this.context.drawImage(src, sprite.sx, sprite.sy, sprite.sw, sprite.sh, x, y, w, h);
    };

    return manager;

})());

loaded('js/engine/components/graphics/manager.js');
