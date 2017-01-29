
///<reference path='../../primitives.ts'/>
///<reference path='../../types.ts'/>

module Engine.Components.Graphics {

export class Layer extends Collection<Visual> implements Visual {
    Render(context : CanvasRenderingContext2D) {
        this.elements.forEach(visual => {
            visual.Render(context);
        });
    }
}

export class Scene extends Collection<Layer> {

    canvas : HTMLCanvasElement;
    context : CanvasRenderingContext2D;

    size : Size;

    constructor(canvas : HTMLCanvasElement) {
        super();

        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.size = new Size(canvas.width, canvas.height);

        this.canvas.width = this.canvas.width * window.devicePixelRatio;
        this.canvas.height = this.canvas.height * window.devicePixelRatio;
        this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    Render() {
        this.context.clearRect(0, 0, this.size.width, this.size.height);

        this.elements.forEach(layer => {
            layer.Render(this.context);
        });
    }
}

}
