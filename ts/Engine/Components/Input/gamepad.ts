
///<reference path='../../primitives.ts'/>
///<reference path='../../types.ts'/>

module Engine.Components.Input.Gamepad {

export enum Buttons {
    None            = 0,
    A               = 1 << 0,
    B               = 1 << 1,
    X               = 1 << 2,
    Y               = 1 << 3,
    DPadUp          = 1 << 4,
    DPadDown        = 1 << 5,
    DPadLeft        = 1 << 6,
    DPadRight       = 1 << 7,
    LeftShoulder    = 1 << 8,
    RightShoulder   = 1 << 9,
    LeftThumbstick  = 1 << 10,
    RightThumbstick = 1 << 11,
    Start           = 1 << 12,
    Back            = 1 << 13,
};

export class Thumbstick {
    public x : number;
    public y : number;

    static Deadzone : number = 0.1;

    constructor(public rawX : number, public rawY : number) {
        var applyDeadzone = (axis : number) : number => {
            var magnitude = Math.abs(axis);

            if (magnitude < Thumbstick.Deadzone)
            {
                return 0.0;
            }
            
            return axis * ((magnitude - Thumbstick.Deadzone) / (1.0 - Thumbstick.Deadzone));
        };

        this.x = applyDeadzone(rawX);
        this.y = applyDeadzone(rawY);
    }
};

export class Reading {
    constructor(
        public leftThumbstick : Thumbstick,
        public rightThumbstick : Thumbstick,
        public rightTrigger : number,
        public leftTrigger : number,
        public buttons : Buttons) {}
};

export class Handler implements System {
    handler : (id : number, reading : Reading) => void

    constructor()
    {
        //
    }

    OnReading(handler : (id : number, reading : Reading) => void) {
        this.handler = handler;
    }

    MapGamepadToGamepadReading(gamepad : Gamepad) : Reading {
        var leftThumbstick = new Thumbstick(gamepad.axes[0], gamepad.axes[1]);
        var rightThumbstick = new Thumbstick(gamepad.axes[2], gamepad.axes[3]);

        var leftTrigger = gamepad.buttons[6].value;
        var rightTrigger = gamepad.buttons[7].value;

        var buttons = Buttons.None;

        if (gamepad.buttons[0].pressed) {
            buttons |= Buttons.A;
        }
        if (gamepad.buttons[1].pressed) {
            buttons |= Buttons.B;
        }
        if (gamepad.buttons[2].pressed) {
            buttons |= Buttons.X;
        }
        if (gamepad.buttons[3].pressed) {
            buttons |= Buttons.Y;
        }
        if (gamepad.buttons[12].pressed) {
            buttons |= Buttons.DPadUp;
        }
        if (gamepad.buttons[13].pressed) {
            buttons |= Buttons.DPadDown;
        }
        if (gamepad.buttons[14].pressed) {
            buttons |= Buttons.DPadLeft;
        }
        if (gamepad.buttons[4].pressed) {
            buttons |= Buttons.LeftShoulder;
        }
        if (gamepad.buttons[5].pressed) {
            buttons |= Buttons.RightShoulder;
        }
        if (gamepad.buttons[10].pressed) {
            buttons |= Buttons.LeftThumbstick;
        }
        if (gamepad.buttons[11].pressed) {
            buttons |= Buttons.RightThumbstick;
        }
        if (gamepad.buttons[8].pressed) {
            buttons |= Buttons.Back;
        }
        if (gamepad.buttons[9].pressed) {
            buttons |= Buttons.Start;
        }

        return new Reading(
            leftThumbstick,
            rightThumbstick,
            leftTrigger,
            rightTrigger,
            buttons
        );
    };

    Update(dt : number) {
        if (this.handler) {
            var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            for (var i = 0; i < gamepads.length; ++i) {
                var gamepad = gamepads[i];

                if (!gamepad) {
                    continue;
                }

                this.handler(gamepad.index, this.MapGamepadToGamepadReading(gamepad));
            }
        }
    }
}

}