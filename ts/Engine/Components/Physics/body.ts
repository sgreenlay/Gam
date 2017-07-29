
///<reference path='../../primitives.ts'/>
///<reference path='../../types.ts'/>

module Engine.Components.Physics {

export class Body {

    acceleration : Point;
    velocity : Point;

    instantaneousVelocity : Point;

    constructor(
        public bounds : Rect)
    {
        this.acceleration = new Point(0,0);

        this.velocity = new Point(0,0);
        this.instantaneousVelocity = new Point(0,0);
    }

    ApplyAcceleration(direction : Point, magnitude : number) {
        this.acceleration.x += direction.x * magnitude;
        this.acceleration.y += direction.y * magnitude;
    }

    ApplyVelocity(direction : Point, magnitude : number) {
        this.velocity.x += direction.x * magnitude;
        this.velocity.y += direction.y * magnitude;
    }

    ApplyInstantaneousVelocity(direction : Point, magnitude : number) {
        this.instantaneousVelocity.x += direction.x * magnitude;
        this.instantaneousVelocity.y += direction.y * magnitude;
    }

    Step(dt : number) {
        this.velocity.x += (this.acceleration.x * dt) / 1000.0;
        this.velocity.y += (this.acceleration.y * dt) / 1000.0;

        var velocity = new Point(
            this.velocity.x + this.instantaneousVelocity.x,
            this.velocity.y + this.instantaneousVelocity.y
        );

        this.instantaneousVelocity = new Point(0,0);

        this.bounds.x += (velocity.x * dt) / 1000.0;
        this.bounds.y += (velocity.y * dt) / 1000.0;
    }
}

}
