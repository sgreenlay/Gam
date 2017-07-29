
///<reference path='../../primitives.ts'/>
///<reference path='../../types.ts'/>

module Engine.Components.Physics {

export class World extends Collection<Body> {

    gravity : Point;

    constructor()
    {
        super();

        this.gravity = new Point(0,0);
    }

    Add(element : Body) {
        element.ApplyAcceleration(this.gravity, 1.0);

        this.elements.push(element);
    }

    ApplyGravity(direction : Point, magnitude : number) {
        this.gravity.x += direction.x * magnitude;
        this.gravity.y += direction.y * magnitude;

        this.elements.forEach(element => {
            element.ApplyAcceleration(direction, magnitude);
        });
    }

    Step(dt : number) {
        this.elements.forEach(body => {
            body.Step(dt);
        });
    }
}

}
