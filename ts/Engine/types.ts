module Engine {

export class Point {
    constructor(public x : number, public y : number) {}
}

export class Size {
    constructor(public width : number, public height : number) {}
}

export class Rect {
    constructor(public x : number, public y : number, public width : number, public height : number) {}
}

export class Vector {
    constructor(public start : Point, public end : Point) {}

    Length() : number {
        var dx = this.end.x - this.start.x;
        var dy = this.end.y - this.start.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    Direction() : Point {
        var dx = this.end.x - this.start.x;
        var dy = this.end.y - this.start.y;

        return new Point(dx, dy);
    }

    Normalize() : Vector {
        var length = this.Length();
        var direction = this.Direction();

        var dx = direction.x / length;
        var dy = direction.y / length;

        return new Vector(this.start, new Point(this.start.x + dx, this.start.y + dy));
    }

    Dot(other : Vector) : number {
        var selfDir = this.Direction();
        var otherDir = other.Direction();

        return selfDir.x * otherDir.x + selfDir.y * otherDir.y;
    }

    AngleTo(other : Vector) : number {
        var selfNorm = this.Normalize();
        var otherNorm = other.Normalize();

        return Math.acos(selfNorm.Dot(otherNorm));
    }
}

}