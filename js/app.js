
let canvas = document.getElementById("game");
let size = { width: canvas.width, height: canvas.height };

class Engine {
    constructor() {
        this.systems = new Array();
        this.objects = new Array();
    }

    update(dt, time) {
        this.systems.forEach(system => system.update(dt, time, this.objects));
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

    addObject(object) {
        this.objects.push(object);
    }
}

class GameObject {
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

class RenderComponent {
    constructor(x, y, w, h) {
        this.bounds = { 
            x : x,
            y : y,
            w : w,
            h : h
        };
    }

    render(ctx) {
        // Draw a rectangle
        ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}

class RenderSystem {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");

        // Adjust size to account for HiDPI
        canvas.width = canvas.width * window.devicePixelRatio;
        canvas.height = canvas.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    update(dt, time, objects) {
        // Fill background
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, size.width, size.height);

        // Iterate through all the renderable objects and render them
        for (var i = 0; i < objects.length; ++i) {
            let object = objects[i];
            let renderer = object.getComponent(RenderComponent);
            if (renderer) {
                renderer.render(this.ctx);
            }
        }
    }
}

const engine = new Engine();

const renderer = new RenderSystem(canvas);
engine.addSystem(renderer);

const box = new GameObject();
box.addComponent(new RenderComponent(size.width / 2 - 20, size.height / 2 - 20, 40, 40));
engine.addObject(box);

engine.run();
