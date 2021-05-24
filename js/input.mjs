import { Component, System } from './engine.mjs';

export class KeyHandler extends Component {
    constructor() {
        super();
    }
}

export class InputSystem extends System {
    constructor(canvas) {
        super();

        canvas.addEventListener('mousedown', (event) => {
            event.preventDefault();
        });
        canvas.addEventListener('mousemove', (event) => {
            event.preventDefault();
        });
        canvas.addEventListener('mouseup', (event) => {
            event.preventDefault();
        });
        canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        document.addEventListener('keydown', (event) => {
            event.preventDefault();
        });
        document.addEventListener('keyup', (event) => {
            event.preventDefault();
        });

        if (window.PointerEvent) {
            canvas.addEventListener("pointerenter", (event) => {
                event.preventDefault();
            });
            canvas.addEventListener("pointerdown", (event) => {
                event.preventDefault();
                canvas.setPointerCapture(event.pointerId);
            });
            canvas.addEventListener("pointermove", (event) => {
                event.preventDefault();
            });
            canvas.addEventListener("pointerup", (event) => {
                event.preventDefault();
            });
            canvas.addEventListener("pointerleave", (event) => {
                event.preventDefault();
            });
        } else {
            canvas.addEventListener("touchstart", (event) => {
                event.preventDefault();
            });
            canvas.addEventListener("touchmove", (event) => {
                event.preventDefault();
            });
            canvas.addEventListener("touchcancel", (event) => {
                event.preventDefault();
            });
            canvas.addEventListener("touchend", (event) => {
                event.preventDefault();
            });
        }
    }

    update(dt, time, entities) {
        // Iterate through all the entities and send them input
        for (var i = 0; i < entities.length; ++i) {
            let entity = entities[i];

            let keyHandlers = entity.getComponents(KeyHandler);
        }
    }
}