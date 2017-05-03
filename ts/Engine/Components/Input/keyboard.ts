
///<reference path='../../primitives.ts'/>
///<reference path='../../types.ts'/>

module Engine.Components.Input.Keyboard {

export enum Key {
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
    Num0 = 48,
    Num1 = 49,
    Num2 = 50,
    Num3 = 51,
    Num4 = 52,
    Num5 = 53,
    Num6 = 54,
    Num7 = 55,
    Num8 = 56,
    Num9 = 57,
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,
    Space = 32
};

export class Handler implements System {
    keys : Map<Boolean>;
    keyHandler : Map<() => void>;

    constructor()
    {
        this.keys = new Map<Boolean>();
        this.keyHandler = new Map<() => void>();

        document.addEventListener('keydown', (event) => {
            this.keys.Add(event.keyCode.toString(), true);
            event.cancelBubble = this.keyHandler.Exists(event.keyCode.toString());
        });
        document.addEventListener('keyup', (event) => {
            this.keys.Remove(event.keyCode.toString());
            event.cancelBubble = this.keyHandler.Exists(event.keyCode.toString());
        });
    }

    OnAnyKey(keys : Array<Key>, handler : () => void) {
        keys.forEach((key : Key) => {
            this.keyHandler.Add(key.toString(), handler);
        });
    }

    OnKey(key : Key, handler : () => void) {
        this.keyHandler.Add(key.toString(), handler);
    }

    Update(dt : number) {
        this.keys.forEach((keyCode : string, value : Boolean) => {
            if (this.keyHandler.Exists(keyCode)) {
                var handler = this.keyHandler.Get(keyCode);
                handler();
            }
        });
    }
}

}