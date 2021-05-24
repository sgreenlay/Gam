import { Component, System } from './engine.mjs';
import { Bounds } from './utils.mjs';

export class Renderable extends Component {
    render(ctx, entity) {
        console.log("Renderable component must implement render");
    }
}

export class RenderRect extends Renderable {
    constructor(color) {
        super();

        this.color = color;
    }

    render(ctx, entity) {
        const bounds = entity.getComponent(Bounds);
        if (bounds != null) {
            ctx.fillStyle = this.color;
            ctx.fillRect(
                bounds.x,
                bounds.y,
                bounds.w,
                bounds.h);
        } else {
            console.log("RenderRect requires a Bounds component");
        }
    }
}

export class RenderImage extends Renderable {
    constructor(src) {
        super();

        this.img = new Image();
        this.img.src = src;
    }

    render(ctx, entity) {
        const bounds = entity.getComponent(Bounds);
        if (bounds != null) {
            ctx.drawImage(
                this.img,
                bounds.x,
                bounds.y,
                bounds.w,
                bounds.h);
        } else {
            console.log("RenderImage requires a Bounds component");
        }
    }
}

export class RenderSystem extends System {
    constructor(canvas) {
        super();

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
            const entity = entities[i];
            const renderables = entity.getComponents(Renderable);
            for (var j = 0; j < renderables.length; ++j) {
                const renderable = renderables[j];
                renderable.render(this.ctx, entity);
            }
        }
    }
}