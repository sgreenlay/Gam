
///<reference path='../Engine/engine.ts'/>

///<reference path='../Engine/Components/Input/mouse.ts'/>
///<reference path='../Engine/Components/Input/keyboard.ts'/>
///<reference path='../Engine/Components/Input/gamepad.ts'/>

///<reference path='../Engine/Components/Graphics/scene.ts'/>
///<reference path='../Engine/Components/Graphics/visual.ts'/>

///<reference path='entity.ts'/>

module Game {

export class Game extends Engine.Game {

    scene : Engine.Components.Graphics.Scene;
    inputHandlers : Engine.Collection<Engine.System>;
    entities : Engine.Collection<Entity>;

    constructor(canvas : HTMLCanvasElement) {
        super();

        // Graphics

        this.scene = new Engine.Components.Graphics.Scene(canvas);

        var background = new Engine.Components.Graphics.Layer();
        this.scene.Add(background);

        var backdrop = new Engine.Components.Graphics.SimpleVisual(
            new Engine.Rect(0, 0, this.scene.size.width, this.scene.size.height),
            "black"
        );
        background.Add(backdrop);

        this.scene.OnResize((size : Engine.Size) => {
            backdrop.bounds = new Engine.Rect(0, 0, size.width, size.height);
        });

        var foreground = new Engine.Components.Graphics.Layer();
        this.scene.Add(foreground);

        // Entities

        this.entities = new Engine.Collection<Entity>();

        var blockPositions = [
            new Engine.Point(
                this.scene.size.width / 2 - 175,
                this.scene.size.height / 2),
            new Engine.Point(
                this.scene.size.width / 2 + 175,
                this.scene.size.height / 2),
            new Engine.Point(
                this.scene.size.width / 2,
                this.scene.size.height / 2 - 175),
            new Engine.Point(
                this.scene.size.width / 2,
                this.scene.size.height / 2 + 175)
        ];

        blockPositions.forEach((point : Engine.Point) => {
            var block = new Entity(
                new Engine.Rect(
                    point.x - 25,
                    point.y - 25,
                    50,
                    50),
                "white"
            );
            this.entities.Add(block);
        });

        this.entities.forEach(entity => {
            foreground.Add(entity.visual);
        });

        // Input

        this.inputHandlers = new Engine.Collection<Engine.System>();

        var mouseHandler = new Engine.Components.Input.Mouse.Handler(canvas);

        mouseHandler.OnButton(
            Engine.Components.Input.Mouse.Button.Left, 
        (start : Engine.Point, current : Engine.Point) => {
            // TODO
        });

        this.inputHandlers.Add(mouseHandler);

        this.Start();
    }

    Update(dt : number) {
        this.scene.Resize();
        this.inputHandlers.forEach((inputHandler : Engine.System) => {
            inputHandler.Update(dt);
        });
        this.scene.Render();
    }
};

}
