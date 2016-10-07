
///<reference path='interfaces.ts'/>
///<reference path='types.ts'/>

///<reference path='Components/frametracker.ts'/>

module Engine {

export class Engine {
    canvas : HTMLCanvasElement;
    context : CanvasRenderingContext2D;

    size : Size;

    frameTracker : Components.FrameTracker;

    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.size = new Size(canvas.width, canvas.height);

        this.canvas.width = this.canvas.width * window.devicePixelRatio;
        this.canvas.height = this.canvas.height * window.devicePixelRatio;
        this.context.scale(window.devicePixelRatio, window.devicePixelRatio);

        this.frameTracker = new Components.FrameTracker();

        this.Update();
    }

    Update = () => {
        this.frameTracker.Tick();

        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // TODO

        this.frameTracker.Render(this.context, 5, this.size.height - 29, 180, 18);

        requestAnimationFrame(this.Update);
    }
};

}