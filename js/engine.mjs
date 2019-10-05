export class Engine {
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

export class Entity {
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