import {Bounds} from './utils.mjs';

export class Renderable {
    constructor() {}
}

export class RenderSystem {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.size = { width: canvas.width, height: canvas.height };

        // Adjust size to account for HiDPI
        canvas.width = canvas.width * window.devicePixelRatio;
        canvas.height = canvas.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    update(dt, time, entities) {
        // Fill background
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, this.size.width, this.size.height);

        // Iterate through all the renderable entities and render them
        for (var i = 0; i < entities.length; ++i) {
            let entity = entities[i];

            let renderable = entity.getComponent(Renderable);
            let bounds = entity.getComponent(Bounds);

            if (renderable && bounds) {
                // Draw a rectangle
                this.ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
                this.ctx.fillRect(
                    bounds.x,
                    bounds.y,
                    bounds.w,
                    bounds.h);
            }
        }
    }
}