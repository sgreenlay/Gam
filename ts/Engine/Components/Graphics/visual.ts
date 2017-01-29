
///<reference path='../../primitives.ts'/>
///<reference path='../../types.ts'/>

module Engine.Components.Graphics {

export interface Visual {
    Render(context : CanvasRenderingContext2D);
}

export class SimpleVisual implements Visual {
    bounds : Rect;
    fill : string;

    constructor(
        bounds : Rect,
        fill : string)
    {
        this.bounds = bounds;
        this.fill = fill;
    }

    Render(context : CanvasRenderingContext2D) {
        context.fillStyle = this.fill;
        context.fillRect(
            this.bounds.x,
            this.bounds.y,
            this.bounds.width,
            this.bounds.height);
    }
}

}
