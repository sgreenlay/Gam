import { Engine, Entity } from './engine.mjs';
import { Bounds } from './utils.mjs';
import { InputSystem } from './input.mjs';
import { RenderSystem, RenderRect, RenderImage } from './render.mjs';

const canvas = document.getElementById("game");
const size = { width: canvas.width, height: canvas.height };

const engine = new Engine();

const input = new InputSystem(canvas);
engine.addSystem(input);
const renderer = new RenderSystem(canvas);
engine.addSystem(renderer);

const box = new Entity();
box.addComponent(new Bounds(size.width / 2 - 45, size.height / 2 - 15, 30, 30));
box.addComponent(new RenderRect("rgba(255, 0, 0, 1.0)"));
engine.addEntity(box);

const image = new Entity();
image.addComponent(new Bounds(size.width / 2 + 15, size.height / 2 - 15, 30, 30));
image.addComponent(new RenderImage('/img/unknown.png'));
engine.addEntity(image);

engine.run();