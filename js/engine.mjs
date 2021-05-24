export class Component {}

export class Entity {
    constructor() {
        this.components = new Array();
    }

    hasComponent(type) {
        const components = this.getComponents(type);
        return ((components != null) && (components.length > 0));
    }

    getComponent(type) {
        for (var i = 0; i < this.components.length; ++i) {
            const component = this.components[i];
            if (component instanceof type) {
                return component;
            }
        }
        return null;
    }

    getComponents(type) {
        let components = [];
        for (var i = 0; i < this.components.length; ++i) {
            const component = this.components[i];
            if (component instanceof type) {
                components.push(component);
            }
        }
        return components;
    }

    addComponent(component) {
        if (component instanceof Component) {
            this.components.push(component);
        } else {
            console.log("Must call Entity.addComponent with a System");
        }
    }
}

export class System {
    update(dt, time, entities) {
        console.log("System must implement update");
    }
}

export class Engine {
    constructor() {
        this.systems = new Array();
        this.entities = new Array();
    }

    update(dt, time) {
        this.systems.forEach(system => {
            system.update(dt, time, this.entities);
        });
    }

    run() {
        const engine = this;
        var lastTime = performance.now();

        const onTick = function () {
            var time = performance.now();
            var delta = time - lastTime;

            engine.update(delta, time);

            lastTime = time;
            requestAnimationFrame(onTick);
        }
        onTick();
    }

    addSystem(system) {
        if (system instanceof System) {
            this.systems.push(system);
        } else {
            console.log("Must call Engine.addSystem with a System");
        }
    }

    addEntity(entity) {
        if (entity instanceof Entity) {
            this.entities.push(entity);
        } else {
            console.log("Must call Engine.addEntity with an Entity");
        }
    }
}