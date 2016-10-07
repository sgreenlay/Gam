
module Engine.Components {

export class FrameTracker {
    lastFrameTime : Date;
    lastFrameDeltas : Array<number>

    constructor() {
        this.lastFrameTime = new Date();
        this.lastFrameDeltas = new Array<number>();
    }

    Tick() {
        var currentFrameTime : Date = new Date();
        var frameDelta : number = currentFrameTime.valueOf() - this.lastFrameTime.valueOf();
        this.lastFrameTime = currentFrameTime;

        if (this.lastFrameDeltas.push(frameDelta) > 120)
        {
            this.lastFrameDeltas.shift();
        }
    }

    Render(
        context : CanvasRenderingContext2D,
        x : number,
        y : number,
        width : number,
        height : number
    ) {
        var frameDeltaToFrameRate = (frameDelta : number) => {
            return 1000 / frameDelta; 
        };

        context.fillStyle = "white";
        context.font = "bold " + height + "px Helvetica";
        context.textAlign = 'left';
        context.textBaseline = 'top';

        var averageFrameDelta : number = 0;
        this.lastFrameDeltas.forEach(frameDelta => {
            averageFrameDelta += frameDelta;
        });
        averageFrameDelta /= this.lastFrameDeltas.length;

        context.fillStyle = "white";
        context.fillText(frameDeltaToFrameRate(averageFrameDelta).toFixed(0), x + 2, y);
        
        var textSize = context.measureText("00");
        var startingIndex = 0;
        if ((width - textSize.width - 6) < 120)
        {
            startingIndex = 120 - (width - textSize.width - 6);
        }
        for (var index = startingIndex; index < this.lastFrameDeltas.length; index++) {
            var frameDelta = this.lastFrameDeltas[index];
            var frameRate = frameDeltaToFrameRate(frameDelta);

            var barHeight = height * (frameRate / 120);
            
            context.fillStyle = "#808080";
            context.fillRect(
                x + textSize.width + 6 + index - startingIndex,
                y + height - barHeight, 1, barHeight);
        }
    }
}

}
