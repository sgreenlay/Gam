
///<reference path='../../primitives.ts'/>
///<reference path='../../types.ts'/>

module Engine.Components.Graphics {

export interface Visual {
    Render(context : CanvasRenderingContext2D);
}

export class SimpleVisual implements Visual {
    constructor(
        public bounds : Rect,
        public color : string)
    {
    }

    Render(context : CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(
            this.bounds.x,
            this.bounds.y,
            this.bounds.width,
            this.bounds.height);
    }
}

}
