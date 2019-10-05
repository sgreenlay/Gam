
import {Engine, Entity} from './engine.mjs';
import {Bounds} from './utils.mjs';
import {RenderSystem, Renderable} from './render.mjs';

let canvas = document.getElementById("game");
let size = { width: canvas.width, height: canvas.height };

const engine = new Engine();

const renderer = new RenderSystem(canvas);
engine.addSystem(renderer);

const box = new Entity();
box.addComponent(new Bounds(size.width / 2 - 20, size.height / 2 - 20, 40, 40));
box.addComponent(new Renderable());
engine.addEntity(box);

engine.run();
