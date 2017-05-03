
///<reference path='../../primitives.ts'/>
///<reference path='../../types.ts'/>

module Engine.Components.Input.Mouse {

export enum Button {
    Left = 0,
    Middle = 1,
    Right = 2
};

export class Handler implements System {
    button : Map<Point>;
    buttonHandler : Map<(position : Point) => void>;

    move : Point;
    moveHandler : (position : Point) => void;

    constructor(canvas : HTMLCanvasElement)
    {
        this.button = new Map<Point>();
        this.buttonHandler = new Map<(position : Point) => void>();

        var getRelativeCoordinates = (event) : Point => {
            var rect = canvas.getBoundingClientRect();

            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;

            return new Point(x, y);
        };

        canvas.addEventListener('mousemove', (event) => {
            this.move = getRelativeCoordinates(event);
            event.cancelBubble = (this.moveHandler != null);
        });
        canvas.addEventListener('mouseout', (event) => {
            this.move = null;
            event.cancelBubble = (this.moveHandler != null);
        });

        canvas.addEventListener('mousedown', (event) => {
            this.button.Add(event.button.toString(), getRelativeCoordinates(event));
            event.cancelBubble = this.buttonHandler.Exists(event.button.toString());
        });
        canvas.addEventListener('mouseup', (event) => {
            this.button.Remove(event.button.toString());
            event.cancelBubble = this.buttonHandler.Exists(event.button.toString());
        });
    }

    OnMove(handler : (position : Point) => void) {
        this.moveHandler = handler;
    }

    OnButton(button : Button, handler : (position : Point) => void) {
        this.buttonHandler.Add(button.toString(), handler);
    }

    Update(dt : number) {
        if (this.move && this.moveHandler) {
            this.moveHandler(this.move);
        }

        this.button.forEach((button : string, position : Point) => {
            if (this.buttonHandler.Exists(button)) {
                var handler = this.buttonHandler.Get(button);
                handler(position);
            }
        });
    }
}

}