
///<reference path='../Engine/engine.ts'/>

///<reference path='../Engine/Components/Input/mouse.ts'/>
///<reference path='../Engine/Components/Input/keyboard.ts'/>
///<reference path='../Engine/Components/Input/gamepad.ts'/>

///<reference path='../Engine/Components/Graphics/scene.ts'/>
///<reference path='../Engine/Components/Graphics/visual.ts'/>

///<reference path='../Engine/Components/Physics/world.ts'/>
///<reference path='../Engine/Components/Physics/body.ts'/>

///<reference path='entity.ts'/>

module Game {

export class Game extends Engine.Game {

    scene : Engine.Components.Graphics.Scene;
    world : Engine.Components.Physics.World;
    inputHandlers : Engine.Collection<Engine.System>;
    entities : Engine.Collection<Entity>;

    constructor(canvas : HTMLCanvasElement) {
        super();

        // Physics

        this.world = new Engine.Components.Physics.World();

        //this.world.ApplyGravity(new Engine.Point(0, 1), 9.81);

        // Graphics

        this.scene = new Engine.Components.Graphics.Scene(canvas);

        var background = new Engine.Components.Graphics.Layer();
        this.scene.Add(background);

        var backdrop = new Engine.Components.Graphics.SimpleVisual(
            new Engine.Rect(0, 0, this.scene.size.width, this.scene.size.height),
            "black"
        );
        background.Add(backdrop);

        var foreground = new Engine.Components.Graphics.Layer();

        this.scene.Add(foreground);

        // Entities

        this.entities = new Engine.Collection<Entity>();

        var character = new Entity(
            new Engine.Rect(
                this.scene.size.width / 2 - 25,
                this.scene.size.height / 2 - 25,
                50,
                50),
            "red"
        );
        this.entities.Add(character);

        var box = new Entity(
            new Engine.Rect(
                this.scene.size.width / 2 + 150,
                this.scene.size.height / 2 - 25,
                50,
                50),
            "green"
        );
        this.entities.Add(box);

        this.entities.forEach(entity => {
            this.world.Add(entity.body);
        });

        this.entities.forEach(entity => {
            foreground.Add(entity.visual);
        });

        // Input

        this.inputHandlers = new Engine.Collection<Engine.System>();

        var mouseHandler = new Engine.Components.Input.Mouse.Handler(canvas);

        mouseHandler.OnButton(Engine.Components.Input.Mouse.Button.Left, (position : Engine.Point) => {
            //
        });

        mouseHandler.OnButton(Engine.Components.Input.Mouse.Button.Right, (position : Engine.Point) => {
            //
        });

        mouseHandler.OnMove((position : Engine.Point) => {
            //
        });

        this.inputHandlers.Add(mouseHandler);

        var keyboardHandler = new Engine.Components.Input.Keyboard.Handler();

        keyboardHandler.OnAnyKey([
            Engine.Components.Input.Keyboard.Key.W
        ],() => {
            character.body.ApplyInstantaneousVelocity(
                new Engine.Point(0.0, -1.0),
                200.0
            );
        });

        keyboardHandler.OnAnyKey([
            Engine.Components.Input.Keyboard.Key.A
        ], () => {
            character.body.ApplyInstantaneousVelocity(
                new Engine.Point(-1.0, 0.0),
                200.0
            );
        });

        keyboardHandler.OnAnyKey([
            Engine.Components.Input.Keyboard.Key.S
        ], () => {
            character.body.ApplyInstantaneousVelocity(
                new Engine.Point(0.0, 1.0),
                200.0
            );
        });

        keyboardHandler.OnAnyKey([
            Engine.Components.Input.Keyboard.Key.D
        ], () => {
            character.body.ApplyInstantaneousVelocity(
                new Engine.Point(1.0, 0.0),
                200.0
            );
        });

        this.inputHandlers.Add(keyboardHandler);

        var gamepadHandler = new Engine.Components.Input.Gamepad.Handler();

        gamepadHandler.OnReading((id: number, reading: Engine.Components.Input.Gamepad.Reading) => {
            character.body.ApplyInstantaneousVelocity(
                new Engine.Point(
                    reading.leftThumbstick.x,
                    reading.leftThumbstick.y
                ),
                200.0
            );

            if (reading.buttons & Engine.Components.Input.Gamepad.Buttons.A) {
                character.visual.color = "green";
            }
            else if (reading.buttons & Engine.Components.Input.Gamepad.Buttons.B) {
                character.visual.color = "red";
            }
            else if (reading.buttons & Engine.Components.Input.Gamepad.Buttons.X) {
                character.visual.color = "blue";
            }
            else if (reading.buttons & Engine.Components.Input.Gamepad.Buttons.Y) {
                character.visual.color = "yellow";
            }
        });

        this.inputHandlers.Add(gamepadHandler);

        this.Start();
    }

    Update(dt : number) {
        this.inputHandlers.forEach((inputHandler : Engine.System) => {
            inputHandler.Update(dt);
        });
        this.world.Step(dt);
        this.scene.Render();
    }
};

}
