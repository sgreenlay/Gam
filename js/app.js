
let canvas = document.getElementById("game");
let size = { width: canvas.width, height: canvas.height };

class Engine {
    constructor() {
        this.systems = new Array();
        this.entities = new Array();
    }

    update(dt, time) {
        this.systems.forEach(system => system.update(dt, time, this.entities));
    }

    run() {
        let engine = this;
        var lastTime = performance.now();

        const onTick = function() {
            var time = performance.now();
            var delta = time - lastTime;

            engine.update(delta, time);

            lastTime = time;
            requestAnimationFrame(onTick);
        }
        onTick();
    }

    addSystem(system) {
        this.systems.push(system);
    }

    addEntity(entity) {
        this.entities.push(entity);
    }
}

class Entity {
    constructor() {
        this.components = new Array();
    }

    getComponent(type) {
        for (var i = 0; i < this.components.length; ++i) {
            let component = this.components[i];
            if (component instanceof type)
            {
                return component;
            }
        }
        return null;
    }

    addComponent(component) {
        this.components.push(component);
    }
}

class Bounds {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Renderable {
    constructor() {}
}

class RenderSystem {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");

        // Adjust size to account for HiDPI
        canvas.width = canvas.width * window.devicePixelRatio;
        canvas.height = canvas.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    update(dt, time, entities) {
        // Fill background
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, size.width, size.height);

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

const engine = new Engine();

const renderer = new RenderSystem(canvas);
engine.addSystem(renderer);

const box = new Entity();
box.addComponent(new Bounds(size.width / 2 - 20, size.height / 2 - 20, 40, 40));
box.addComponent(new Renderable());
engine.addEntity(box);

engine.run();
