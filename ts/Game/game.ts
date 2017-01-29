
///<reference path='../Engine/engine.ts'/>

///<reference path='../Engine/Components/Graphics/scene.ts'/>
///<reference path='../Engine/Components/Graphics/visual.ts'/>

module Game {

export class Game extends Engine.Game {

    scene : Engine.Components.Graphics.Scene;

    constructor(canvas : HTMLCanvasElement) {
        super();

        this.scene = new Engine.Components.Graphics.Scene(canvas);

        var background = new Engine.Components.Graphics.Layer();
        this.scene.Add(background);

        var foreground = new Engine.Components.Graphics.Layer();
        this.scene.Add(foreground);

        var backdrop = new Engine.Components.Graphics.SimpleVisual(
            new Engine.Rect(0, 0, this.scene.size.width, this.scene.size.height),
            "black"
        );
        background.Add(backdrop);

        var character = new Engine.Components.Graphics.SimpleVisual(
            new Engine.Rect(
                this.scene.size.width / 2 - 25,
                this.scene.size.height / 2 - 25,
                50,
                50),
            "red"
        );
        foreground.Add(character);

        this.Start();
    }

    Update(dt : number) {
        this.scene.Render();
    }
};

}
