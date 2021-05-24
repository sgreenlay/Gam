import { Component } from './engine.mjs';

export class Bounds extends Component {
    constructor(x, y, w, h) {
        super();

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}