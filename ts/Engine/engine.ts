
///<reference path='types.ts'/>

///<reference path='Components/timer.ts'/>

module Engine {

export interface System {
    Update(dt : number);
}

export abstract class Game implements System {
    lastFrameTime : Date;

    Start() {
        this.lastFrameTime = new Date();

        this.OnFrame();
    }

    abstract Update(dt : number);

    OnFrame = () => {
        var frameTime : Date = new Date();
        var frameDelta : number = frameTime.valueOf() - this.lastFrameTime.valueOf();
        this.lastFrameTime = frameTime;

        this.Update(frameDelta);

        requestAnimationFrame(this.OnFrame);
    }
};

}