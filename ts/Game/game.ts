
///<reference path='../Engine/engine.ts'/>

///<reference path='../Engine/Components/Graphics/scene.ts'/>
///<reference path='../Engine/Components/Graphics/visual.ts'/>

///<reference path='../Engine/Components/Input/mouse.ts'/>
///<reference path='../Engine/Components/Input/keyboard.ts'/>
///<reference path='../Engine/Components/Input/gamepad.ts'/>

module Game {

export class Game extends Engine.Game {

    scene : Engine.Components.Graphics.Scene;
    inputHandlers : Engine.Collection<Engine.System>;

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
            character.bounds.y -= 5;
        });

        keyboardHandler.OnAnyKey([
            Engine.Components.Input.Keyboard.Key.A
        ], () => {
            character.bounds.x -= 5;
        });

        keyboardHandler.OnAnyKey([
            Engine.Components.Input.Keyboard.Key.S
        ], () => {
            character.bounds.y += 5;
        });

        keyboardHandler.OnAnyKey([
            Engine.Components.Input.Keyboard.Key.D
        ], () => {
            character.bounds.x += 5;
        });

        this.inputHandlers.Add(keyboardHandler);

        var gamepadHandler = new Engine.Components.Input.Gamepad.Handler();

        gamepadHandler.OnReading((id: number, reading: Engine.Components.Input.Gamepad.Reading) => {
            character.bounds.x += reading.leftThumbstick.x * 7.5;
            character.bounds.y += reading.leftThumbstick.y * 7.5;

            if (reading.buttons & Engine.Components.Input.Gamepad.Buttons.A) {
                character.color = "green";
            }
            else if (reading.buttons & Engine.Components.Input.Gamepad.Buttons.B) {
                character.color = "red";
            }
            else if (reading.buttons & Engine.Components.Input.Gamepad.Buttons.X) {
                character.color = "blue";
            }
            else if (reading.buttons & Engine.Components.Input.Gamepad.Buttons.Y) {
                character.color = "yellow";
            }
        });

        this.inputHandlers.Add(gamepadHandler);

        this.Start();
    }

    Update(dt : number) {
        this.inputHandlers.forEach((inputHandler : Engine.System) => {
            inputHandler.Update(dt);
        });
        this.scene.Render();
    }
};

}
